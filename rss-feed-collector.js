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
  let cache = new Map();
  let nextRefreshTime;
  let timerInterval;
  let pingVolume = 1;
  const statusItems = new Map();

  console.log("DOM fully loaded and parsed");

  const { format } = dateFns;

  const FEEDS_URL = 'https://NewsCorpGSOC.github.io/newscorpgsoc.github.io/feeds.json';  // Replace with your actual URL
  
  const fetchFeedData = async () => {
    try {
      const response = await fetch(FEEDS_URL);
      if (!response.ok) throw new Error('Failed to fetch feed data');
      const feedData = await response.json();
      feedItems = feedData.flatMap(feed => parseFeedContent(feed));
      displayFeeds();
    } catch (error) {
      console.error('Error fetching feed data:', error);
    }
  };

  const parseFeedContent = (feed) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(feed.content, 'text/xml');
    return Array.from(xmlDoc.querySelectorAll('item')).map(item => ({
      title: item.querySelector('title')?.textContent || 'No title',
      link: item.querySelector('link')?.textContent || '#',
      description: item.querySelector('description')?.textContent || 'No description',
      pubDate: new Date(item.querySelector('pubDate')?.textContent),
      source: new URL(feed.url).hostname,
    }));
  };

  const displayFeeds = () => {
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

    searchFilteredFeeds.forEach(item => {
      const feedElement = document.createElement('div');
      feedElement.classList.add('feed');
      feedElement.innerHTML = `
        <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
        <p>${item.description}</p>
        <p><small>Published on: ${format(item.pubDate, 'PPpp')} (PST/PDT)</small></p>
        <p><strong>Source:</strong> ${item.source}</p>
      `;
      feedsContainer.appendChild(feedElement);
    });
  };

  const parseSearchTerm = (searchTerm) => {
    const termGroups = searchTerm.split(/\s+OR\s+/i).map(group => {
      return group.split(/\s+AND\s+/i).map(term => term.replace(/"/g, '').trim());
    });
    return termGroups;
  };

  const applyFilter = () => {
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
  };

  function setUpdateInterval() {
    if (updateInterval) {
      clearInterval(updateInterval);
    }
    const frequency = parseInt(updateFrequency.value, 10);
    console.log(`Setting update interval to ${frequency} milliseconds`);
    updateInterval = setInterval(() => {
      console.log('Fetching feeds...');
      fetchFeedData();
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

  timelineFilter.addEventListener('change', displayFeeds);
  topicFilter.addEventListener('change', displayFeeds);
  sourceFilterContainer.addEventListener('change', displayFeeds);
  searchInput.addEventListener('input', displayFeeds);
  updateFrequency.addEventListener('change', setUpdateInterval);
  volumeSlider.addEventListener('input', (event) => {
    pingVolume = event.target.value;
    console.log('Volume slider value:', pingVolume);
  });

  populateSourceFilter();
  fetchFeedData();
  setUpdateInterval();
});
