import rssFeeds from './rssFeeds.js';

document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');
  const loadingOverlay = document.getElementById('loading-overlay');
  const timelineFilter = document.getElementById('timelineFilter');
  const topicFilter = document.getElementById('topicFilter');
  const sourceFilterContainer = document.getElementById('sourceFilterContainer');
  const toggleSourceFilterButton = document.getElementById('toggleSourceFilter');
  const searchInput = document.getElementById('searchInput');
  const statusContainer = document.getElementById('statusContainer');
  const refreshTimerDisplay = document.getElementById('refresh-timer');
  const volumeSlider = document.getElementById('volumeSlider');
  let feedItems = [];
  let latestFeedDate = new Date(0);
  let pingVolume = 0.5;
  const statusItems = new Map();

  console.log("DOM fully loaded and parsed");

  const { format } = dateFns;

  rssFeeds.sort((a, b) => a.source.localeCompare(b.source));

  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  const RETRIES = 1;

  const fetchFeed = async (feed, retries = RETRIES) => {
    for (const url of [feed.url, ...(feed.backups || [])]) {
      try {
        console.log(`Fetching URL: ${url}`);
        const response = await fetch(url);
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        const isAtom = xmlDoc.documentElement.nodeName === 'feed';
        const items = isAtom ? xmlDoc.getElementsByTagName('entry') : xmlDoc.getElementsByTagName('item');
        const feedItemsArray = Array.from(items);
        let feedItems = [];
  
        feedItemsArray.forEach(item => {
          const title = item.querySelector('title')?.textContent || 'No title';
          let link = isAtom 
            ? item.querySelector('link[rel="alternate"]')?.getAttribute('href') 
            : item.querySelector('link')?.textContent || item.querySelector('link')?.getAttribute('href') || '#';
          const description = isAtom 
            ? item.querySelector('summary')?.textContent || item.querySelector('content')?.textContent || 'No description' 
            : item.querySelector('description')?.textContent || 'No description';
          const pubDateText = isAtom 
            ? item.querySelector('published')?.textContent 
            : item.querySelector('pubDate')?.textContent;
          const pubDate = pubDateText ? parseDate(pubDateText) : new Date();
          const pacificDate = convertToPacificTime(pubDate, feed.source);
  
          // Fallback: Extract link from description HTML if link is still undefined
          if (!link || link === '#') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = description;
            const anchor = tempDiv.querySelector('a');
            link = anchor ? anchor.href : '#';
          }
  
          if (title && link && description && pacificDate) {
            feedItems.push({
              title,
              link,
              description: decodeHTMLEntities(description),
              pubDate: pacificDate,
              source: feed.source
            });
          } else {
            console.log('Incomplete item:', { title, link, description, pacificDate });
          }
        });
  
        // Apply filtering based on required and ignore terms
        feedItems = filterFeedItems(feedItems, feed.requiredTerms, feed.ignoreTerms);
  
        updateStatus(feed.source, feed.url, true);
        console.log(`Fetched ${feedItems.length} items from ${feed.source}`);
        return feedItems;
      } catch (error) {
        console.error(`Error fetching RSS feed from ${feed.source}:`, error);
        updateStatus(feed.source, feed.url, false);
        if (retries > 0) {
          await delay(2000); // wait before retrying
          return fetchFeed(feed, retries - 1);
        }
      }
    }
    return [];
  };
  // Define the csvFiles array with source information
  const csvFiles = [
    { file: 'Israel_Security_Cabinet_News.csv', source: 'CSV Israel Security Cabinet News' },
    { file: 'Stand_With_Us_Breaking_News.csv', source: 'CSV Stand With Us Breaking News' },
    { file: 'Ukraine_Air_Defense.csv', source: 'CSV Ukraine Air Defense' },
    { file: 'WOLPalestine.csv', source: 'CSV WOLPalestine' }
  ];

  async function fetchCSVFiles() {
    let csvFeedItems = [];

    for (const { file, source } of csvFiles) {
      try {
        // Adding a cache-busting query parameter
        const cacheBuster = new Date().getTime();
        const response = await fetch(`GoogleSheets/${file}?cb=${cacheBuster}`);
        const csvText = await response.text();
        console.log(`Fetched CSV: ${file}`);
        console.log(csvText); // Log fetched CSV text for debugging
        const parsedCSV = parseCSV(csvText, source);
        console.log(parsedCSV); // Log parsed CSV data for debugging
        csvFeedItems = csvFeedItems.concat(parsedCSV);
      } catch (error) {
        console.error(`Error fetching CSV file ${file}:`, error);
      }
    }
    return csvFeedItems;
  }

  function parseCSV(csvText, source) {
    const lines = csvText.split('\n').filter(line => line.trim() !== ''); // Remove empty lines
    const headers = lines[0].split(',');

    const sheetNameIndex = headers.indexOf('Sheet Name');
    const summaryIndex = headers.indexOf('Summary');
    const publishedIndex = headers.indexOf('Published (Pacific Time)');
    const linkIndex = headers.indexOf('Link');

    return lines.slice(1).map((line, index) => {
      const cells = line.split(',');

      const title = cells[sheetNameIndex]?.trim() || 'No title';
      const link = cells[linkIndex]?.trim() || '#';
      const description = decodeHTMLEntities(cells[summaryIndex]?.trim() || 'No description');
      const pubDate = parseDate(cells[publishedIndex]?.trim());

      if (!pubDate) {
        console.warn(`Skipping row ${index + 2} due to invalid date: ${line}`);
        return null; // Skip rows with invalid dates
      }

      return {
        title,
        link,
        description,
        pubDate: convertToPacificTime(pubDate, source),
        source // Use the source passed to the function
      };
    }).filter(item => item); // Filter out null values
  }

  function filterFeedItems(items, requiredTerms, ignoreTerms) {
    return items.filter(item => {
      const content = `${item.title} ${item.description}`.toLowerCase();

      // If requiredTerms is not empty, ensure at least one required term is found
      if (requiredTerms.length > 0 && !requiredTerms.some(term => content.includes(term.toLowerCase()))) {
        return false;
      }

      // If ignoreTerms is not empty, ensure no ignore term is found
      if (ignoreTerms.length > 0 && ignoreTerms.some(term => content.includes(term.toLowerCase()))) {
        return false;
      }

      return true;
    });
  }

  function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

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
      console.error(`Invalid date value: ${dateString}`);
      return null; // Return null for invalid dates
    }
    return parsedDate;
  }

  function convertToPacificTime(date, source) {
    let adjustedDate = new Date(date);

    // Prioritize source-specific adjustments
    if (source === 'The Kyiv Independent') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Hill') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The New York Times') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'BBC News') {                                 
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Guardian') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Al Jazeera - Latest') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Al Jazeera - World') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
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
    } else if (source === 'Yahoo News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Politico EU') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Politico') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The Star') {
      adjustedDate.setHours(adjustedDate.getHours() - 3);
    } else if (source === 'Brandon Sun') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The Hindu Business Line') {
      adjustedDate.setHours(adjustedDate.getHours() + 0.5);
    } else if (source === 'Zee News India') {
      adjustedDate.setHours(adjustedDate.getHours() - 0.5);
    } else if (source === 'Live Mint India') {
      adjustedDate.setHours(adjustedDate.getHours() - 6.5);
    } else if (source === 'Financial Times') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Channel 4 News') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Sky News Politics') {
      adjustedDate.setHours(adjustedDate.getHours() - 8);
    } else if (source === 'The Economist - Europe') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Economist - Americas') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Economist - MENA') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The New Zealand Herald') {
      adjustedDate.setHours(adjustedDate.getHours() - 3);
    } else if (source === 'Wall Street Journal') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The Jerusalem Post - Arab-Israeli Conflict') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Breaking News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - World News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Israel-Hamas War') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Middle East News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Ukraine-Russia War') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Gaza') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'New York Post') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'USNI News') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Israel Hayom') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'VOA News - East Asia') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - China News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Africa') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Middle East') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Europe') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Ukraine') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Americas') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Extremism Watch') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Flashpoint Global Crises') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - International Edition') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - South and Central Asia') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Issues in the News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Flashpoint Ukraine') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Fact Checks') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Blog4President') {
      adjustedDate.setHours(adjustedDate.getHours() - 2);
    } else if (source === 'Space Force News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Sydney Morning Herald') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'U.S. State Department - Africa') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. State Department - East Asia and the Pacific') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. State Department - Europe and Eurasia') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. State Department - Near East') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. State Department - South and Central Asia') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. Department of Defense') {
      adjustedDate.setHours(adjustedDate.getHours() - 2);
    } else if (source === 'CNBC') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'ISW') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'CBC') {
      adjustedDate.setHours(adjustedDate.getHours() - 3);
    } else if (source === 'Cipher Brief') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'CTV News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Channel News Asia') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Factal Forecast') {
      adjustedDate.setHours(adjustedDate.getHours() - 3);
    } else if (source === 'World News Era') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'South China Morning Post') {
      adjustedDate.setHours(adjustedDate.getHours() - 15);
    } else if (source === 'South China Morning Post') {
      adjustedDate.setHours(adjustedDate.getHours() - 9);
    } else if (source === 'The Federalist') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Breaking News Subreddit') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Yemeni Crisis Subreddit') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'World News Subreddit') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'International News Subreddit') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Naharnet - Lebanon') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Naharnet - Middle East') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'WOLPalestine Telegram') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Air Force of the Armed Forces of Ukraine Telegram') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'National Weather Service') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Israel Security Cabinet News Telegram') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Saba Agency Telegram') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Epoch Times Telegram') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Stand With Us Breaking News Telegram') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Global Shake Princeton') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Euro News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'CSV Israel Security Cabinet News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0); // Adjust according to specific source timezone if needed
    } else if (source === 'CSV Stand With Us Breaking News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'CSV Ukraine Air Defense') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'CSV WOLPalestine') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else {
      console.warn(`No specific time adjustment found for source: ${source}`);
    }

    return adjustedDate;
  }

  function removeDuplicateTitles(items) {
    const uniqueItems = new Map();
    items.forEach(item => {
      if (!uniqueItems.has(item.title) || uniqueItems.get(item.title).pubDate < item.pubDate) {
        uniqueItems.set(item.title, item);
      }
    });
    return Array.from(uniqueItems.values());
  }

  function removeDuplicateImages(description) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, 'text/html');
    const imgElements = doc.querySelectorAll('img');
    const uniqueImages = new Set();
    imgElements.forEach(img => {
      if (uniqueImages.has(img.src)) {
        img.remove();
      } else {
        uniqueImages.add(img.src);
      }
    });
    return doc.body.innerHTML;
  }

  async function fetchFeedsSequentially() {
    const interval = 3000; // 3 seconds interval
  
    const priorityIntervals = {
      'Very High': 30000, // 30 seconds
      'High': 60000, // 1 minute
      'Medium': 180000, // 3 minutes
      'Low': 300000, // 5 minutes
      'Very Low': 600000 // 10 minutes
    };
  
    // Fetch all feeds initially
    await Promise.all(rssFeeds.map(feed => fetchFeedAndUpdate(feed)));
    const csvFeedItems = await fetchCSVFiles();
    feedItems = [...feedItems, ...csvFeedItems];
    feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by date, newest first
    displayFeeds();
  
    rssFeeds.forEach((feed) => {
      const fetchInterval = priorityIntervals[feed.priorityLevel] || 180000; // Default to 3 minutes if not specified
      console.log(`Scheduling fetch for ${feed.source} with interval of ${fetchInterval} ms`);
  
      setInterval(() => {
        console.log(`Periodic fetch for ${feed.source}`);
        fetchFeedAndUpdate(feed);
      }, fetchInterval);
    });
  
    // Fetch CSV files periodically
    setInterval(async () => {
      const csvFeedItems = await fetchCSVFiles();
      feedItems = [...feedItems.filter(item => !csvFeedItems.find(csvItem => csvItem.title === item.title)), ...csvFeedItems];
      feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by date, newest first
      console.log('Combined Feed Items:', feedItems); // Log combined feed items for debugging
      displayFeeds();
    }, 180000); // Fetch CSV files every 3 minutes
  }

  async function fetchFeedAndUpdate(feed) {
    console.log(`Fetching feed from ${feed.source}`);
    const data = await fetchFeed(feed);
    if (data.length === 0) {
      console.log(`No items found in feed from ${feed.source}`);
    }
    feedItems = [...feedItems.filter(item => item.source !== feed.source), ...data];
    feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by date, newest first

    if (data.length > 0 && data[0].pubDate > latestFeedDate) {
      latestFeedDate = data[0].pubDate;
      playSound();
    }

    displayFeeds();
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
    feedItems = removeDuplicateTitles(feedItems);
  
    const now = new Date();
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
  
    const filteredFeeds = applyFilter();
    console.log(`Filtered Feeds Count: ${filteredFeeds.length}`);
  
    const searchTerm = searchInput.value.trim().toLowerCase();
    const searchTerms = parseSearchTerm(searchTerm);
  
    const recentFeeds = filteredFeeds.filter(item => item.pubDate > oneYearAgo);
    console.log(`Recent Feeds Count: ${recentFeeds.length}`);
  
    const searchFilteredFeeds = recentFeeds.filter(item =>
      searchTerms.every(termGroup =>
        termGroup.some(term =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.source.toLowerCase().includes(term)
        )
      )
    );
    console.log(`Search Filtered Feeds Count: ${searchFilteredFeeds.length}`);
  
    const fragment = document.createDocumentFragment();
    searchFilteredFeeds.forEach(item => {
      const feedElement = document.createElement('div');
      feedElement.classList.add('feed');
  
      let imageHtml = '';
      const parser = new DOMParser();
      const doc = parser.parseFromString(item.description, 'text/html');
      const img = doc.querySelector('img');
      if (img) {
        imageHtml = `<img src="${img.src}" alt="Feed image" onerror="this.onerror=null;this.src='https://i.imgur.com/GQPN5Q9.jpeg';" />`;
      }
  
      const cleanedDescription = removeDuplicateImages(item.description);
  
      feedElement.innerHTML = 
        `<h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
        ${imageHtml}
        <div>${cleanedDescription}</div>
        <p><small>Published on: ${format(item.pubDate, 'PPpp')} (PST/PDT)</small></p>
        <p><strong>Source:</strong> ${item.source}</p>`;
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
    console.log(`Total Feed Items: ${feedItems.length}`);

    const timelineValue = timelineFilter.value;
    if (timelineValue === 'lastHour') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 3600000);
    } else if (timelineValue === 'last12Hours') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 43200000);
    } else if (timelineValue === 'lastDay') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 86400000);
    }

    const topicKeywords = {
      'Russia': ['Russia', 'Ukraine', 'Belarus', 'Donbas', 'Crimea', 'Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy', 'Sumy', 'Zhytomyr', 'Khmelnytskyi', 'Chernivtsi', 'Rivne', 'Ivano-Frankivsk', 'Ternopil', 'Kropyvnytskyi', 'Lutsk', 'Uzhhorod', 'Moscow', 'Saint Petersburg', 'Nizhny Novgorod', 'Kazan', 'Voronezh', 'Saratov', 'Krasnodar', 'Tolyatti', 'Izhevsk', 'Ulyanovsk', 'Yaroslavl', 'Tyumen', 'Barnaul', 'Vladivostok', 'Irkutsk', 'Khabarovsk', 'Kurgan', 'Kaliningrad', 'Belgorod', 'Ivanovo', 'Kostroma', 'Kursk', 'Lipetsk', 'Orel', 'Ryazan', 'Smolensk', 'Tula', 'Tver', 'Vladimir', 'Bryansk', 'Pskov', 'Novgorod', 'Kaluga', 'Tambov'],
      'Israel': ['Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank', 'Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Ashdod', 'Netanya', 'Beer Sheva', 'Bnei Brak', 'Holon', 'Ramat Gan', 'Ashkelon', 'Rehovot', 'Bat Yam', 'Kfar Saba', 'Herzliya', 'Modiin-Maccabim-Reut', 'Raanana', 'Beit Shemesh', 'Kiryat Ata', 'Lod', 'Nazareth', 'Ramla', 'Hadera', 'Betar Illit', 'Tiberias', 'Eilat', 'Acre', 'Hod Hasharon', 'Givatayim', 'Umm al-Fahm', 'Tayibe', 'Sakhnin', 'Karmiel', 'Tira', 'Sderot', 'Kiryat Gat', 'Kiryat Bialik', 'Kiryat Motzkin', 'Rosh HaAyin', 'Nahariya', 'Or Yehuda', 'Yavne', 'Ramat HaSharon', 'Maale Adumim', 'Dimona', 'Migdal HaEmek', 'Arad', 'Ofakim', 'Yokneam Illit', 'Kiryat Yam', 'Qalansawe', 'Kiryat Malakhi', 'Gaza', 'Ramallah', 'Hebron', 'Nablus', 'Bethlehem', 'Jenin', 'Jericho', 'Khan Yunis', 'Rafah'],
      'MENA': ['Lebanon', 'Syria', 'Iraq', 'Iran', 'Islamic Resistance', 'Houthi', 'Yemen', 'Saudi Arabia', 'UAE', 'United Arab Emirates', 'Turkey', 'Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank', 'Jordan', 'IRGC', 'Hezbollah', 'Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Aleppo', 'Damascus', 'Homs', 'Latakia', 'Beirut', 'Amman', 'Baghdad', 'Basra', 'Mosul', 'Erbil', 'Kuwait City', 'Manama', 'Doha', 'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Muscat', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Tehran', 'Mashhad', 'Isfahan', 'Karaj', 'Tabriz', 'Shiraz', 'Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'Asyut', 'Fes', 'Casablanca', 'Rabat', 'Marrakesh', 'Tangier', 'Agadir', 'Tunis', 'Sfax', 'Sousse', 'Tripoli', 'Benghazi', 'Misrata', 'Algiers', 'Oran', 'Constantine', 'Annaba'],
      'Protests': ['protest', 'march', 'rally', 'demonstration', 'strike', 'riot', 'vigil'],
      'Weather': ['climate', 'environment', 'storm', 'tornado', 'hurricane', 'heatwave', 'earthquake', 'tsunami'],
      'China & APAC Tensions': ['South China Sea', 'SCS', 'Nine-Dash Line', 'Spratly Islands', 'Paracel Islands', 'Scarborough Shoal', 'ASEAN', 'Philippines and South China Sea', 'Vietnam and South China Sea', 'Malaysia and South China Sea', 'Brunei and South China Sea', 'Chinas artificial islands', 'US-China relations', 'Sino-American relations'],
      'North Korea': ['North Korea', 'DPRK', 'Pyongyang', 'Kim Jong-un', 'North Korean government', 'North Korean military', 'North Korean regime', 'North Korean sanctions', 'North Korean economy', 'North Korean diplomacy', 'North Korean missile test', 'North Korean missile launch', 'North Korean missile test', 'North Korean missile launch', 'South Korea', 'ROK', 'Seoul', 'South Korean government', 'South Korean military', 'Moon Jae-in', 'Yoon Suk-yeol', 'Kaesong Industrial Complex', 'Cheonan sinking', 'Yeonpyeong Island shelling', 'North Korean artillery fire', 'North Korean missile tests', 'North Korean nuclear tests', 'North Korean espionage', 'South Korean sanctions', 'South Korean defense strategy', 'North Korean provocations', 'North Korean threats', 'Pyongyang', 'Hamhung', 'Chongjin', 'Nampo', 'Wonsan', 'Sinuiju', 'Tanchon', 'Kaesong', 'Sariwon', 'Haeju', 'Kimchaek', 'Hyesan', 'Songnim', 'Rason', 'Kanggye', 'Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Seongnam', 'Goyang', 'Yongin', 'Bucheon', 'Cheongju', 'Jeonju', 'Cheonan', 'Ansan', 'Sejong', 'Anyang', 'Uijeongbu', 'Gimhae', 'Pyeongtaek', 'Jinju', 'Pohang', 'Mokpo', 'Jeju', 'Gwangmyeong'],
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

    console.log(`Filtered Feeds After ApplyFilter: ${filteredFeeds.length}`);
    return filteredFeeds;
  }

  timelineFilter.addEventListener('change', debounce(displayFeeds, 300));
  topicFilter.addEventListener('change', debounce(displayFeeds, 300));
  sourceFilterContainer.addEventListener('change', debounce(displayFeeds, 300));
  searchInput.addEventListener('input', debounce(displayFeeds, 300));
  volumeSlider.addEventListener('input', (event) => {
    pingVolume = event.target.value;
    console.log('Volume slider value:', pingVolume);
  });

  volumeSlider.value = pingVolume;

  populateSourceFilter();
  fetchFeedsSequentially();
});
