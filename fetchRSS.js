const fs = require('fs');
const fetch = require('node-fetch');

const RSS_FEEDS = [
  'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  'https://feeds.bbci.co.uk/news/rss.xml',
  // Add more RSS feed URLs here
];

const fetchFeeds = async () => {
  let feedData = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const response = await fetch(feedUrl);
      if (!response.ok) throw new Error(`Failed to fetch ${feedUrl}`);
      const text = await response.text();
      feedData.push({ url: feedUrl, content: text });
    } catch (error) {
      console.error(`Error fetching feed from ${feedUrl}:`, error);
    }
  }

  fs.writeFileSync('feeds.json', JSON.stringify(feedData, null, 2));
};

fetchFeeds();
