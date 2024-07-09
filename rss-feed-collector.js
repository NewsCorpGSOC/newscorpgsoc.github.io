document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');

  const rssUrls = [
    'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    'https://feeds.bbci.co.uk/news/rss.xml',
    'https://www.theguardian.com/world/rss'
  ];

  rssUrls.forEach(url => {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
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

          const feed = document.createElement('div');
          feed.classList.add('feed');
          feed.innerHTML = `
            <h2><a href="${link}" target="_blank">${title}</a></h2>
            <p>${description}</p>
            <p><small>Published on: ${pubDate}</small></p>
          `;

          feedsContainer.appendChild(feed);
        });
      })
      .catch(error => {
        console.error('Error fetching RSS feed:', error);
      });
  });
});
