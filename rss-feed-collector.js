document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');
  const loadingOverlay = document.getElementById('loading-overlay');
  const timelineFilter = document.getElementById('timelineFilter');
  const topicFilter = document.getElementById('topicFilter');
  const searchInput = document.getElementById('searchInput');
  const updateFrequency = document.getElementById('updateFrequency');
  let feedItems = []; // Array to store all feed items
  let updateInterval;

  const { parseISO, format } = dateFns;

  const rssFeeds = [
    {
      url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
      source: 'The New York Times'
    },
    {
      url: 'https://feeds.bbci.co.uk/news/rss.xml',
      source: 'BBC News'
    },
    {
      url: 'http://feeds.bbci.co.uk/news/world/rss.xml',
      source: 'BBC News - World'
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
      source: 'Fox News'
    },
    {
      url: 'http://feeds.foxnews.com/foxnews/latest',
      source: 'Fox News Top Stories'
    },
    {
      url: 'http://feeds.nbcnews.com/nbcnews/topstories',
      source: 'NBC News'
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
      url: 'http://www.huffingtonpost.com/feeds/verticals/world/index.xml',
      source: 'Huffington Post'
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
      source: 'Politico'
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
      url: 'https://www.jpost.com/rss/',
      source: 'The Jerusalem Post'
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

  async function fetchFeed(feed) {
    try {
      const feedUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;
      const backupFeedUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;

      const data = await fetchWithBackup(feedUrl, backupFeedUrl);
      const contents = data.contents ? data.contents : data.items;

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

          const pacificDate = convertToPacificTime(pubDate, pubDateText);

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

          const pacificDate = convertToPacificTime(pubDate, pubDateText);

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
    } catch (error) {
      console.error(`Error fetching RSS feed from ${feed.source}:`, error);
    }
  }

  function parseDate(dateString) {
    // Manually parse the date string to handle different formats
    const parsedDate = new Date(dateString);

    // Validate the parsed date
    if (isNaN(parsedDate)) {
      throw new Error(`Invalid date value: ${dateString}`);
    }

    return parsedDate;
  }

  function convertToPacificTime(date, dateString) {
    let adjustedDate = new Date(date);

    // Adjust time based on time zone in the date string
    if (dateString.includes('GMT')) {
      adjustedDate.setHours(adjustedDate.getHours() - 7); // GMT to PDT
    } else if (dateString.includes('EDT')) {
      adjustedDate.setHours(adjustedDate.getHours() - 4 - 7); // EDT to PDT
    } else if (dateString.includes('CDT')) {
      adjustedDate.setHours(adjustedDate.getHours() - 5 - 7); // CDT to PDT
    } else if (dateString.includes('MDT')) {
      adjustedDate.setHours(adjustedDate.getHours() - 6 - 7); // MDT to PDT
    } else if (dateString.includes('BST')) {
      adjustedDate.setHours(adjustedDate.getHours() + 1 - 7); // BST to PDT
    } else if (dateString.includes('CEST')) {
      adjustedDate.setHours(adjustedDate.getHours() + 2 - 7); // CEST to PDT
    } else if (dateString.includes('IST')) {
      adjustedDate.setHours(adjustedDate.getHours() + 5.5 - 7); // IST to PDT
    } else if (dateString.includes('JST')) {
      adjustedDate.setHours(adjustedDate.getHours() + 9 - 7); // JST to PDT
    } else if (dateString.includes('AEST')) {
      adjustedDate.setHours(adjustedDate.getHours() + 10 - 7); // AEST to PDT
    } else if (dateString.includes('NZST')) {
      adjustedDate.setHours(adjustedDate.getHours() + 12 - 7); // NZST to PDT
    } else if (dateString.includes('+0000')) {
      adjustedDate.setHours(adjustedDate.getHours() - 7); // GMT to PDT
    }

    return adjustedDate;
  }

  async function fetchFeeds() {
    feedItems = []; // Clear existing feed items
    loadingOverlay.style.display = 'flex'; // Show loading overlay
    for (const feed of rssFeeds) {
      await fetchFeed(feed);
    }
    feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by newest first
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
