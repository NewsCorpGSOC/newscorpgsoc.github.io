document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');
  const loadingOverlay = document.getElementById('loading-overlay');
  const timelineFilter = document.getElementById('timelineFilter');
  const topicFilter = document.getElementById('topicFilter');
  const sourceFilterContainer = document.getElementById('sourceFilterContainer');
  const toggleSourceFilterButton = document.getElementById('toggleSourceFilter');
  const searchInput = document.getElementById('searchInput');
  const updateFrequency = document.getElementById('updateFrequency');
  const statusContainer = document.getElementById('statusContainer');
  const refreshTimerDisplay = document.getElementById('refresh-timer');
  const volumeSlider = document.getElementById('volumeSlider');
  let feedItems = [];
  let latestFeedDate = new Date(0);
  let updateInterval;
  let cache = new Map();
  let nextRefreshTime;
  let timerInterval;
  let pingVolume = 1;
  const statusItems = new Map();

  console.log("DOM fully loaded and parsed");

  const { format } = dateFns;

  const rssFeeds = [
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FHomePage.xml',
      source: 'The New York Times',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml',
        'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FUS.xml'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml',
      source: 'BBC News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml',
        'http://feeds.bbci.co.uk/news/uk/rss.xml'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.theguardian.com%2Fworld%2Frss',
      source: 'The Guardian',
      backups: [
        'https://www.theguardian.com/uk/rss',
        'https://www.theguardian.com/us/rss'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.aljazeera.com%2Fxml%2Frss%2Fall.xml',
      source: 'Al Jazeera - Latest'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwol.com%2Ffeed%2F',
      source: 'World Online'
    },
    {
      url: 'https://rss-bridge.org/bridge01/?action=display&topic=world-news&context=Custom+Topic&bridge=AssociatedPressNewsBridge&format=Atom',
      source: 'Associated Press'
    },
    {
      url: 'https://moxie.foxnews.com/google-publisher/world.xml',
      source: 'Fox News - World'
    },
    {
      url: 'https://moxie.foxnews.com/google-publisher/latest.xml',
      source: 'Fox News Top Stories'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Ffeeds.npr.org%2F1001%2Frss.xml',
      source: 'NPR News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fnews.un.org%2Ffeed%2Fsubscribe%2Fen%2Fnews%2Fall%2Frss.xml',
      source: 'UN News'
    },
  ];
  
  rssFeeds.sort((a, b) => a.source.localeCompare(b.source));

  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function populateSourceFilter() {
    const uniqueSources = [...new Set(rssFeeds.map(feed => feed.source))];
    uniqueSources.sort().forEach(source => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = source;
      checkbox.name = 'sourceFilter';
      checkbox.value = source;
      checkbox.checked = true;

      const label = document.createElement('label');
      label.htmlFor = source;
      label.textContent = source;

      const container = document.createElement('div');
      container.appendChild(checkbox);
      container.appendChild(label);

      sourceFilterContainer.appendChild(container);
    });
  }

  toggleSourceFilterButton.addEventListener('click', () => {
    const isHidden = sourceFilterContainer.style.display === 'none';
    sourceFilterContainer.style.display = isHidden ? 'block' : 'none';
    toggleSourceFilterButton.textContent = isHidden ? 'Hide Source Filter' : 'Show Source Filter';
  });

  const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour
  const RETRIES = 3;

  const fetchFeed = async (feed, retries = RETRIES) => {
    try {
      const response = await fetch(feed.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${feed.url}`);
      }
      const text = await response.text(); // Retrieve the response as text
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'application/xml');
      const items = xmlDoc.querySelectorAll('item, entry'); // Support both RSS (item) and Atom (entry) formats

      let feedItems = [];
      
      items.forEach(item => {
        const title = item.querySelector('title')?.textContent || 'No title';
        const link = item.querySelector('link')?.textContent || '#';
        const description = item.querySelector('description, summary')?.textContent || 'No description';
        const pubDateText = item.querySelector('pubDate, updated')?.textContent;
        const pubDate = pubDateText ? parseDate(pubDateText) : new Date();

        const pacificDate = convertToPacificTime(pubDate, feed.source);

        if (title && link && description && pacificDate) {
          feedItems.push({
            title,
            link,
            description,
            pubDate: pacificDate,
            source: feed.source
          });
        } else {
          console.log('Incomplete item:', { title, link, description, pacificDate });
        }
      });

      updateStatus(feed.source, feed.url, true);
      return feedItems;
    } catch (error) {
      console.error(`Error fetching RSS feed from ${feed.source}:`, error);
      updateStatus(feed.source, feed.url, false);
      if (retries > 0) {
        await delay(2000); // wait before retrying
        return fetchFeed(feed, retries - 1);
      }
      return [];
    }
  };

  function updateStatus(source, url, success) {
    const statusHtml = `${success ? '✅' : '❌'} <a href="${url}" target="_blank">${source}</a>`;
    statusItems.set(source, statusHtml);  // Update the status map

    // Sort the status items alphabetically by source
    const sortedStatusItems = Array.from(statusItems.entries()).sort(([sourceA], [sourceB]) => sourceA.localeCompare(sourceB));

    // Clear the status container and re-append sorted status items
    statusContainer.innerHTML = '';
    sortedStatusItems.forEach(([source, html]) => {
      const statusItem = document.createElement('div');
      statusItem.dataset.source = source;
      statusItem.innerHTML = html;
      statusContainer.appendChild(statusItem);
    });
  }
  
  function parseDate(dateString) {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate)) {
      throw new Error(`Invalid date value: ${dateString}`);
    }
    return parsedDate;
  }

  function convertToPacificTime(date, source) {
    let adjustedDate = new Date(date);

    // Prioritize source-specific adjustments
    if (source === 'The New York Times') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'BBC News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Guardian') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Al Jazeera - Latest') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'World Online') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Associated Press') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'Fox News - World') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Fox News Top Stories') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'NPR News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'UN News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else {
      console.warn(`No specific time adjustment found for source: ${source}`);
    }

    return adjustedDate;
  }

  async function fetchFeeds() {
    loadingOverlay.style.display = 'flex';

    const fetchPromises = rssFeeds.map(feed => {
      const cacheTime = cache.get(feed.url) && cache.get(feed.url).timestamp;
      const now = new Date().getTime();

      if (cacheTime && (now - cacheTime < CACHE_EXPIRATION)) {
        return Promise.resolve(cache.get(feed.url).data);
      } else {
        return fetchFeed(feed).then(data => {
          cache.set(feed.url, {
            data,
            timestamp: new Date().getTime()
          });
          return data;
        });
      }
    });

    const results = await Promise.all(fetchPromises);
    const newFeedItems = results.flat().sort((a, b) => b.pubDate - a.pubDate);

    const hasNewItems = newFeedItems.some(item => item.pubDate > latestFeedDate);

    if (hasNewItems) {
      console.log('New items detected, playing sound');
      playSound();
      latestFeedDate = newFeedItems[0].pubDate;
    }

    feedItems = newFeedItems;

    loadingOverlay.style.display = 'none';
    displayFeeds();
    resetRefreshTimer();
  }

  function playSound() {
    console.log('Playing sound at volume:', pingVolume);
    const audio = new Audio('sounds/news-alert-notification.mp3');
    audio.volume = pingVolume;
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  }

  function displayFeeds() {
    feedsContainer.innerHTML = '';
    const filteredFeeds = applyFilter();
    const searchTerm = searchInput.value.trim().toLowerCase();
    const searchTerms = parseSearchTerm(searchTerm);

    const searchFilteredFeeds = filteredFeeds.filter(item =>
      searchTerms.every(termGroup =>
        termGroup.some(term =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.source.toLowerCase().includes(term)
        )
      )
    );
  
    console.log('Filtered feeds:', searchFilteredFeeds);

    const fragment = document.createDocumentFragment();
    searchFilteredFeeds.forEach(item => {
      const feedElement = document.createElement('div');
      feedElement.classList.add('feed');
      feedElement.innerHTML = `
        <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
        <p>${item.description}</p>
        <p><small>Published on: ${format(item.pubDate, 'PPpp')} (PST/PDT)</small></p>
        <p><strong>Source:</strong> ${item.source}</p>
      `;
      fragment.appendChild(feedElement);
    });
    feedsContainer.appendChild(fragment);
  }
  
  function parseSearchTerm(searchTerm) {
    const termGroups = searchTerm.split(/\s+OR\s+/i).map(group => {
      return group.split(/\s+AND\s+/i).map(term => term.replace(/"/g, '').trim());
    });
    return termGroups;
  }

  function applyFilter() {
    const now = new Date();
    let filteredFeeds = [...feedItems];

    const timelineValue = timelineFilter.value;
    if (timelineValue === 'lastHour') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 3600000);
    } else if (timelineValue === 'last12Hours') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 43200000);
    } else if (timelineValue === 'lastDay') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 86400000);
    }

    const topicKeywords = {
      'Russia': ['Russia', 'Ukraine', 'Kyiv', 'Kharkiv', 'Belarus', 'Donbas', 'Crimea'],
      'Israel': ['Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank'],
      'MENA': ['Lebanon', 'Syria', 'Iraq', 'Iran', 'Islamic Resistance', 'Houthi', 'Yemen', 'Saudi Arabia', 'UAE', 'United Arab Emirates', 'Turkey', 'Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank', 'Jordan', 'IRGC', 'Hezbollah'],
      'Protests': ['protest', 'march', 'rally', 'demonstration', 'strike', 'riot', 'vigil'],
      'Weather': ['climate', 'environment', 'storm', 'tornado', 'hurricane', 'heatwave', 'earthquake', 'tsunami'],
      // Add more topics and their corresponding keywords here
    };

    const topicValue = topicFilter.value;
    if (topicValue !== 'all' && topicKeywords[topicValue]) {
      const keywords = topicKeywords[topicValue].map(keyword => keyword.toLowerCase());
      filteredFeeds = filteredFeeds.filter(item =>
        keywords.some(keyword => item.description.toLowerCase().includes(keyword))
      );
    }

    const checkedSources = Array.from(document.querySelectorAll('input[name="sourceFilter"]:checked')).map(cb => cb.value);
    if (checkedSources.length > 0 && !checkedSources.includes('all')) {
      filteredFeeds = filteredFeeds.filter(item => checkedSources.includes(item.source));
    }

    return filteredFeeds;
  }

  function setUpdateInterval() {
    if (updateInterval) {
      clearInterval(updateInterval);
    }
    const frequency = parseInt(updateFrequency.value, 10);
    console.log(`Setting update interval to ${frequency} milliseconds`);
    updateInterval = setInterval(() => {
      console.log('Fetching feeds...');
      fetchFeeds();
    }, frequency);

    nextRefreshTime = Date.now() + frequency;
    startRefreshTimer();
  }

  function startRefreshTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
      const remainingTime = nextRefreshTime - Date.now();
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        refreshTimerDisplay.textContent = '00:00';
      } else {
        const minutes = String(Math.floor(remainingTime / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0');
        refreshTimerDisplay.textContent = `${minutes}:${seconds}`;
      }
    }, 1000);
  }

  function resetRefreshTimer() {
    nextRefreshTime = Date.now() + parseInt(updateFrequency.value, 10);
    startRefreshTimer();
  }

  timelineFilter.addEventListener('change', debounce(displayFeeds, 300));
  topicFilter.addEventListener('change', debounce(displayFeeds, 300));
  sourceFilterContainer.addEventListener('change', debounce(displayFeeds, 300));
  searchInput.addEventListener('input', debounce(displayFeeds, 300));
  updateFrequency.addEventListener('change', setUpdateInterval);
  volumeSlider.addEventListener('input', (event) => {
    pingVolume = event.target.value;
    console.log('Volume slider value:', pingVolume);
  });

  populateSourceFilter();
  fetchFeeds();
  setUpdateInterval();
});
