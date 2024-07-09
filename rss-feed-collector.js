document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');

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

  const feedItems = [];
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
          const pubDate = item.querySelector('pubDate').textContent;

          const date = new Date(pubDate);
          const options = { timeZone: 'America/Los_Angeles', hour12: true, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
          const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

          feedItems.push({
            title,
            link,
            description,
            pubDate: date,
            formattedDate,
            source: feed.source
          });
        });

        fetchCount++;
        if (fetchCount === rssFeeds.length) {
          feedItems.sort((a, b) => b.pubDate - a.pubDate);
          feedItems.forEach(item => {
            const feedElement = document.createElement('div');
            feedElement.classList.add('feed');
            feedElement.innerHTML = `
              <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
              <p>${item.description}</p>
              <p><small>Published on: ${item.formattedDate} (PST/PDT)</small></p>
              <p><strong>Source:</strong> ${item.source}</p>
            `;
            feedsContainer.appendChild(feedElement);
          });
        }
      })
      .catch(error => {
        console.error('Error fetching RSS feed:', error);
      });
  });
});
