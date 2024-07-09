document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds-container');
  const filterLastHourBtn = document.getElementById('filterLastHour');
  const filterLast12HoursBtn = document.getElementById('filterLast12Hours');
  const filterLastDayBtn = document.getElementById('filterLastDay');
  const filterAllBtn = document.getElementById('filterAll');
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
      url: 'https://www.theguardian.com/world/rss',
      source: 'The Guardian'
    }
    {
      url: 'https://www.aljazeera.com/xml/rss/all.xml',
      source: 'Al Jazeera'
    },
    {
      url: 'https://www.globalissues.org/whatsnew/whatsnew.xml',
      source: 'Global Issues'
    },
    {
      url: 'https://wol.com/feed/',
      source: 'World Online'
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
    let filteredFeeds = [];

    if (filterLastHourBtn.classList.contains('active')) {
      filteredFeeds = feedItems.filter(item => now - item.pubDate <= 3600000); // Within last hour (3600000 ms)
    } else if (filterLast12HoursBtn.classList.contains('active')) {
      filteredFeeds = feedItems.filter(item => now - item.pubDate <= 43200000); // Within last 12 hours (43200000 ms)
    } else if (filterLastDayBtn.classList.contains('active')) {
      filteredFeeds = feedItems.filter(item => now - item.pubDate <= 86400000); // Within last day (86400000 ms)
    } else {
      filteredFeeds = [...feedItems]; // All feeds
    }

    return filteredFeeds;
  }

  // Event listeners for filter buttons
  filterLastHourBtn.addEventListener('click', () => {
    filterLastHourBtn.classList.add('active');
    filterLast12HoursBtn.classList.remove('active');
    filterLastDayBtn.classList.remove('active');
    filterAllBtn.classList.remove('active');
    displayFeeds();
  });

  filterLast12HoursBtn.addEventListener('click', () => {
    filterLastHourBtn.classList.remove('active');
    filterLast12HoursBtn.classList.add('active');
    filterLastDayBtn.classList.remove('active');
    filterAllBtn.classList.remove('active');
    displayFeeds();
  });

  filterLastDayBtn.addEventListener('click', () => {
    filterLastHourBtn.classList.remove('active');
    filterLast12HoursBtn.classList.remove('active');
    filterLastDayBtn.classList.add('active');
    filterAllBtn.classList.remove('active');
    displayFeeds();
  });

  filterAllBtn.addEventListener('click', () => {
    filterLastHourBtn.classList.remove('active');
    filterLast12HoursBtn.classList.remove('active');
    filterLastDayBtn.classList.remove('active');
    filterAllBtn.classList.add('active');
    displayFeeds();
  });

  // Initial fetch and display on page load
  fetchFeeds();
});
