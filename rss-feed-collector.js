document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');
  const loadingOverlay = document.getElementById('loading-overlay');
  const timelineFilter = document.getElementById('timelineFilter');
  const topicFilter = document.getElementById('topicFilter');
  const searchInput = document.getElementById('searchInput');
  const updateFrequency = document.getElementById('updateFrequency');
  let feedItems = []; // Array to store all feed items
  let updateInterval;
  let cache = {}; // Cache object to store fetched feed data

  const { format } = dateFns;

  const rssFeeds = [
    {
      url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
      source: 'The New York Times'
    },
    {
      url: 'http://feeds.bbci.co.uk/news/world/rss.xml',
      source: 'BBC News'
    },
    {
      url: 'https://www.theguardian.com/world/rss',
      source: 'The Guardian'
    },
    {
      url: 'https://www.aljazeera.com/xml/rss/all.xml',
      source: 'Al Jazeera - Latest'
    },
    {
      url: 'https://www.aljazeera.com/xml/rss/world.xml',
      source: 'Al Jazeera - World'
    },
    {
      url: 'https://wol.com/feed/',
      source: 'World Online'
    },
    {
      url: 'https://hosted.ap.org',
      source: 'Associated Press'
    },
    {
      url: 'http://feeds.foxnews.com/foxnews/world',
      source: 'Fox News - World'
    },
    {
      url: 'http://feeds.foxnews.com/foxnews/latest',
      source: 'Fox News Top Stories'
    },
    {
      url: 'https://feeds.npr.org/1001/rss.xml',
      source: 'NPR News'
    },
    {
      url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml',
      source: 'UN News'
    },
    {
      url: 'http://rss.news.yahoo.com/rss/world',
      source: 'Yahoo News'
    },
    {
      url: 'https://www.politico.com/rss/politicopicks.xml',
      source: 'Politico'
    },
    {
      url: 'https://www.politico.eu/feed/',
      source: 'Politico EU'
    },
    {
      url: 'https://www.thestar.com/search/?f=rss&t=article&c=news/world*&l=50&s=start_time&sd=desc',
      source: 'The Star'
    },
    {
      url: 'https://www.brandonsun.com/feed?path=%2Fnational%2Fbreaking-news',
      source: 'Brandon Sun'
    },
    {
      url: 'https://www.thehindubusinessline.com/news/?service=rss',
      source: 'The Hindu Business Line'
    },
    {
      url: 'https://zeenews.india.com/rss/world-news.xml',
      source: 'Zee News India'
    },
    {
      url: 'https://www.livemint.com/rss/politics',
      source: 'Live Mint India'
    },
    {
      url: 'https://www.ft.com/world-uk?format=rss',
      source: 'Financial Times'
    },
    {
      url: 'https://www.channel4.com/news/uk/rss',
      source: 'Channel 4 News'
    },
    {
      url: 'https://feeds.skynews.com/feeds/rss/politics.xml',
      source: 'Sky News Politics'
    },
    {
      url: 'https://www.economist.com/europe/rss.xml',
      source: 'The Economist - Europe'
    },
    {
      url: 'https://www.economist.com/the-americas/rss.xml',
      source: 'The Economist - Americas'
    },
    {
      url: 'https://www.economist.com/middle-east-and-africa/rss.xml',
      source: 'The Economist - MENA'
    },
    {
      url: 'https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/world/?outputType=xml&_website=nzh',
      source: 'The New Zealand Herald'
    },
    {
      url: 'https://www.newsweek.com/rss',
      source: 'Newsweek'
    },
    {
      url: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
      source: 'Wall Street Journal'
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsarabisraeliconflict.aspx',
      source: 'The Jerusalem Post - Arab-Israeli Conflict'
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsheadlines.aspx',
      source: 'The Jerusalem Post - Breaking News'
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsinternational',
      source: 'The Jerusalem Post - World News'
    },
    {
      url: 'https://rss.jpost.com/rss/israel-hamas-war',
      source: 'The Jerusalem Post - Israel-Hamas War'
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsmiddleeastnews.aspx',
      source: 'The Jerusalem Post - Middle East News'
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsiran',
      source: 'The Jerusalem Post - Iran News'
    },
    {
      url: 'https://rss.jpost.com/rss/rssukrainerussiawar',
      source: 'The Jerusalem Post - Ukraine-Russia War'
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsgaza.aspx',
      source: 'The Jerusalem Post - Gaza'
    },
    {
      url: 'https://thehill.com/feed/',
      source: 'The Hill'
    },
    {
      url: 'https://nypost.com/feed/',
      source: 'New York Post'
    },
    {
      url: 'https://news.usni.org/feed',
      source: 'USNI News'
    },
    {
      url: 'https://www.israelhayom.com/feed/',
      source: 'Israel Hayom'
    },
    {
      url: 'https://kyivindependent.com/news-archive/rss/',
      source: 'The Kyiv Independent'
    },
    // Social Media RSS Feeds
    {
      url: 'https://news.google.com/rss/search?q=site:twitter.com/centcom+when:7d',
      source: 'USCENTCOM - TwitterX'
    },
    {
      url: 'https://news.google.com/rss/search?q=site:twitter.com/middleeasteye+when:7d',
      source: 'Middle East Eye - TwitterX'
    },
  ];

  const fetchWithBackup = async (url, backupUrl) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`Primary API failed, trying backup: ${error.message}`);
      const backupResponse = await fetch(backupUrl);
      if (!backupResponse.ok) {
        throw new Error(`Backup API failed: ${backupResponse.statusText}`);
      }
      return await backupResponse.json();
    }
  };

  const fetchFeed = async (feed) => {
    try {
      const feedUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
      const backupFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;

      const data = await fetchWithBackup(feedUrl, backupFeedUrl);
      const contents = data.contents ? data.contents : data.items;

      let feedItems = [];

      if (typeof contents === 'string') {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(contents, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');

        items.forEach(item => {
          const title = item.querySelector('title')?.textContent || 'No title';
          const link = item.querySelector('link')?.textContent || '#';
          const description = item.querySelector('description')?.textContent || 'No description';
          const pubDateText = item.querySelector('pubDate')?.textContent;
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
      } else if (Array.isArray(contents)) {
        contents.forEach(item => {
          const title = item.title || 'No title';
          const link = item.link || '#';
          const description = item.description || 'No description';
          const pubDateText = item.pubDate;
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
      } else {
        console.error('Unexpected data format');
      }

      return feedItems;
    } catch (error) {
      console.error(`Error fetching RSS feed from ${feed.source}:`, error);
      return [];
    }
  };

  function parseDate(dateString) {
    // Manually parse the date string to handle different formats
    const parsedDate = new Date(dateString);

    // Validate the parsed date
    if (isNaN(parsedDate)) {
      throw new Error(`Invalid date value: ${dateString}`);
    }

    return parsedDate;
  }

  function convertToPacificTime(date, source) {
    let adjustedDate = new Date(date);

    // Prioritize source-specific adjustments
    if (source === 'The Kyiv Independent') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'The Hill') {
      adjustedDate.setHours(adjustedDate.getHours() + 7);
    } else if (source === 'The New York Times') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'BBC News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Guardian') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Al Jazeera - Latest') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Al Jazeera - World') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'World Online') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Associated Press') {
      adjustedDate.setHours(adjustedDate.getHours() - 3);
    } else if (source === 'Fox News - World') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Fox News Top Stories') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'NPR News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'UN News') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
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
      adjustedDate.setHours(adjustedDate.getHours() - 12.5);
    } else if (source === 'Zee News India') {
      adjustedDate.setHours(adjustedDate.getHours() - 12.5);
    } else if (source === 'Live Mint India') {
      adjustedDate.setHours(adjustedDate.getHours() - 12.5);
    } else if (source === 'Financial Times') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Channel 4 News') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Sky News Politics') {
      adjustedDate.setHours(adjustedDate.getHours() - 8);
    } else if (source === 'The Economist - Europe') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The Economist - Americas') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The Economist - MENA') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The New Zealand Herald') {
      adjustedDate.setHours(adjustedDate.getHours() - 1);
    } else if (source === 'Newsweek') {
      adjustedDate.setHours(adjustedDate.getHours() - 3);
    } else if (source === 'Wall Street Journal') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The Jerusalem Post - Arab-Israeli Conflict') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'The Jerusalem Post - Breaking News') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'The Jerusalem Post - World News') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'The Jerusalem Post - Israel-Hamas War') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'The Jerusalem Post - Middle East News') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'The Jerusalem Post - Iran News') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'The Jerusalem Post - Ukraine-Russia War') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'The Jerusalem Post - Gaza') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'New York Post') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'USNI News') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Israel Hayom') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'USCENTCOM - TwitterX') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Middle East Eye - TwitterX') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else {
      console.warn(`No specific time adjustment found for source: ${source}`);
    }

    return adjustedDate;
  }

  async function fetchFeeds() {
    loadingOverlay.style.display = 'flex'; // Show loading overlay

    const fetchPromises = rssFeeds.map(feed => {
      // Use cached data if available and not too old
      const cacheTime = cache[feed.url] && cache[feed.url].timestamp;
      const now = new Date().getTime();
      const cacheDuration = 60000; // Cache duration in milliseconds (e.g., 1 minute)

      if (cacheTime && (now - cacheTime < cacheDuration)) {
        return Promise.resolve(cache[feed.url].data);
      } else {
        return fetchFeed(feed).then(data => {
          cache[feed.url] = {
            data,
            timestamp: new Date().getTime()
          };
          return data;
        });
      }
    });
    
    const results = await Promise.all(fetchPromises);
    feedItems = results.flat().sort((a, b) => b.pubDate - a.pubDate); // Flatten results and sort by newest first

    loadingOverlay.style.display = 'none'; // Hide loading overlay
    displayFeeds();
  }

  function displayFeeds() {
    feedsContainer.innerHTML = ''; // Clear previous content
    const filteredFeeds = applyFilter(); // Apply current filter
    const searchTerm = searchInput.value.trim().toLowerCase(); // Get search term
    const searchFilteredFeeds = filteredFeeds.filter(item => 
      item.title.toLowerCase().includes(searchTerm) || 
      item.description.toLowerCase().includes(searchTerm) ||
      item.source.toLowerCase().includes(searchTerm)
    ); // Filter feeds based on search term
    console.log('Filtered feeds:', searchFilteredFeeds); // Log filtered feeds
    
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
  }

  function applyFilter() {
    const now = new Date();
    let filteredFeeds = [...feedItems]; // Start with all feeds

    const timelineValue = timelineFilter.value;
    if (timelineValue === 'lastHour') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 3600000);
    } else if (timelineValue === 'last12Hours') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 43200000);
    } else if (timelineValue === 'lastDay') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 86400000);
    }

    const topicValue = topicFilter.value;
    if (topicValue !== 'all') {
      filteredFeeds = filteredFeeds.filter(item => item.description.toLowerCase().includes(topicValue.toLowerCase()));
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
  }

  timelineFilter.addEventListener('change', displayFeeds);
  topicFilter.addEventListener('change', displayFeeds);
  searchInput.addEventListener('input', displayFeeds);
  updateFrequency.addEventListener('change', setUpdateInterval);

  fetchFeeds();
  setUpdateInterval(); // Set the initial update interval based on the default value
});
