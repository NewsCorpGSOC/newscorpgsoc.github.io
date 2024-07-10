document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');
  const timelineFilter = document.getElementById('timelineFilter');
  const topicFilter = document.getElementById('topicFilter');
  const searchInput = document.getElementById('searchInput');
  const updateFrequency = document.getElementById('updateFrequency');
  let feedItems = []; // Array to store all feed items
  let updateInterval;

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
      url: 'http://hosted.ap.org/lineups/WORLDHEADS-rss_2.0.xml',
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
  ];

  function fetchFeeds() {
    feedItems = []; // Clear existing feed items
    let fetchCount = 0;

    rssFeeds.forEach(feed => {
      const feedUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`;

      fetch(feedUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          if (typeof data.contents === 'string') {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
            const items = xmlDoc.querySelectorAll('item');

            items.forEach(item => {
              const title = item.querySelector('title')?.textContent || 'No title';
              const link = item.querySelector('link')?.textContent || '#';
              const description = item.querySelector('description')?.textContent || 'No description';
              const pubDateText = item.querySelector('pubDate')?.textContent;
              const pubDate = pubDateText ? new Date(pubDateText) : new Date();

              if (title && link && description && pubDate) {
                feedItems.push({
                  title,
                  link,
                  description,
                  pubDate,
                  source: feed.source
                });
              } else {
                console.log('Incomplete item:', { title, link, description, pubDate });
              }
            });

            fetchCount++;
            if (fetchCount === rssFeeds.length) {
              feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by newest first
              displayFeeds();
            }
          } else {
            console.error('Response data is not string');
          }
        })
        .catch(error => {
          console.error('Error fetching RSS feed:', error);
        });
    });
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
        <p><small>Published on: ${item.pubDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })} (PST/PDT)</small></p>
        <p><strong>Source:</strong> ${item.source}</p>
      `;
      feedsContainer.appendChild(feedElement);
    });
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
        <p><small>Published on: ${item.pubDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })} (PST/PDT)</small></p>
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
  topicFilter.addEventListener('change', displayFeeds
