document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');
  const timelineFilter = document.getElementById('timelineFilter');
  const topicFilter = document.getElementById('topicFilter');
  let feedItems = []; // Array to store all feed items

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
      url: 'https://www.globalissues.org/whatsnew/whatsnew.xml',
      source: 'Global Issues'
    },
    {
      url: 'https://wol.com/feed/',
      source: 'World Online'
    },
    {
      url: 'http://rss.cnn.com/rss/cnn_topstories.rss',
      source: 'CNN Top Stories'
    },
    {
      url: 'http://rss.cnn.com/rss/edition_world.rss',
      source: 'CNN World News'
    },
    {
      url: 'http://rss.cnn.com/rss/edition_us.rss',
      source: 'CNN US News'
    },
    {
      url: 'http://feeds.reuters.com/Reuters/worldNews',
      source: 'Reuters'
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
      url: 'http://feeds.washingtonpost.com/rss/national',
      source: 'The Washington Post National'
    },
    {
      url: 'http://feeds.washingtonpost.com/rss/world',
      source: 'The Washington Post World'
    },
  ];

  function fetchFeeds() {
    feedItems = []; // Clear existing feed items
    let fetchCount = 0;

    rssFeeds.forEach(feed => {
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(feed.url)}`)
        .then(response => response.json())
        .then(data => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
          const items = xmlDoc.querySelectorAll('item');

          items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const description = item.querySelector('description').textContent;
            const pubDate = new Date(item.querySelector('pubDate').textContent);

            feedItems.push({
              title,
              link,
              description,
              pubDate,
              source: feed.source
            });
          });

          fetchCount++;
          if (fetchCount === rssFeeds.length) {
            feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by newest first
            displayFeeds();
          }
        })
        .catch(error => {
          console.error('Error fetching RSS feed:', error);
        });
    });
  }

  // Display feeds based on current filter
  function displayFeeds() {
    feedsContainer.innerHTML = ''; // Clear previous content
    const filteredFeeds = applyFilter(); // Apply current filter
    filteredFeeds.forEach(item => {
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

  // Apply filter based on selected time range
  function applyFilter() {
    const now = new Date();
    let filteredFeeds = [...feedItems]; // Start with all feeds

    // Apply timeline filter
    const timelineValue = timelineFilter.value;
    if (timelineValue === 'lastHour') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 3600000); // Within last hour (3600000 ms)
    } else if (timelineValue === 'last12Hours') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 43200000); // Within last 12 hours (43200000 ms)
    } else if (timelineValue === 'lastDay') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 86400000); // Within last day (86400000 ms)
    }

    // Apply topic filter
    const topicValue = topicFilter.value;
    if (topicValue !== 'all') {
      filteredFeeds = filteredFeeds.filter(item => item.description.toLowerCase().includes(topicValue.toLowerCase()));
    }

    return filteredFeeds;
  }

  // Event listeners for filter changes
  timelineFilter.addEventListener('change', displayFeeds);
  topicFilter.addEventListener('change', displayFeeds);

  // Initial fetch and display on page load
  fetchFeeds();
});
