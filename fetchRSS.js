const fs = require('fs');
const fetch = require('node-fetch');

const RSS_FEEDS = [
  'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
  'https://rss.nytimes.com/services/xml/rss/nyt/US.xml',
  'http://feeds.bbci.co.uk/news/world/rss.xml',
  'http://feeds.bbci.co.uk/news/rss.xml',
  'http://feeds.bbci.co.uk/news/uk/rss.xml',
  'https://www.theguardian.com/world/rss',
  'https://www.theguardian.com/uk/rss',
  'https://www.theguardian.com/us/rss',
  'https://www.aljazeera.com/xml/rss/all.xml',
  'https://www.aljazeera.com/xml/rss/world.xml',
  'https://wol.com/feed/',
  'https://hosted.ap.org',
  'http://feeds.foxnews.com/foxnews/world',
  'http://feeds.foxnews.com/foxnews/latest',
  'https://feeds.npr.org/1001/rss.xml',
  'https://news.un.org/feed/subscribe/en/news/all/rss.xml',
  'http://rss.news.yahoo.com/rss/world',
  'https://www.politico.com/rss/politicopicks.xml',
  'https://www.politico.eu/feed/',
  'https://www.thestar.com/search/?f=rss&t=article&c=news/world*&l=50&s=start_time&sd=desc',
  'https://www.brandonsun.com/feed?path=%2Fnational%2Fbreaking-news',
  'https://www.thehindubusinessline.com/news/?service=rss',
  'https://zeenews.india.com/rss/world-news.xml',
  'https://www.livemint.com/rss/politics',
  'https://www.ft.com/world-uk?format=rss',
  'https://feeds.skynews.com/feeds/rss/politics.xml',
  'https://feeds.skynews.com/feeds/rss/world.xml',
  'https://www.economist.com/europe/rss.xml',
  'https://www.economist.com/the-americas/rss.xml',
  'https://www.economist.com/middle-east-and-africa/rss.xml',
  'https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/world/?outputType=xml&_website=nzh',
  'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
  'https://rss.jpost.com/rss/rssfeedsarabisraeliconflict.aspx',
  'https://rss.jpost.com/rss/rssfeedsheadlines.aspx',
  'https://rss.jpost.com/rss/rssfeedsinternational',
  'https://rss.jpost.com/rss/israel-hamas-war',
  'https://rss.jpost.com/rss/rssfeedsmiddleeastnews.aspx',
  'https://rss.jpost.com/rss/rssfeedsiran',
  'https://rss.jpost.com/rss/rssukrainerussiawar',
  'https://rss.jpost.com/rss/rssfeedsgaza.aspx',
  'https://thehill.com/feed/',
  'https://nypost.com/feed/',
  'https://news.usni.org/feed',
  'https://www.israelhayom.com/feed/',
  'https://kyivindependent.com/news-archive/rss/',
  'https://www.voanews.com/api/zobo_egviy',
  'https://www.voanews.com/api/z-botevtiq',
  'https://www.voanews.com/api/zmjuqteb_kqo',
  'https://www.voanews.com/api/z_-mqyerv_qv',
  'https://www.voanews.com/api/zrbopeuvim',
  'https://www.voanews.com/api/zvgmqieo__qm',
  'https://www.voanews.com/api/zjboveytit',
  'https://www.voanews.com/api/zt_rqyeirqqy',
  'https://www.voanews.com/api/zoripegtim',
  'https://www.voanews.com/api/zbuiqyetppqv',
  'https://www.voanews.com/api/ziu-qoejibqo',
  'https://www.voanews.com/api/z-ukqqevpgqi',
  'https://www.voanews.com/api/zumgqoepbgqp',
  'https://www.voanews.com/api/zvq-qveok-qv',
  'https://www.voanews.com/api/zmbjqvebv-qr',
  'https://blog.4president.us/2024/atom.xml',
  'https://blog.4president.us/2024/index.rdf',
  'https://blog.4president.us/2024/rss.xml',
  'https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&isdashboardselected=0&max=20&Category=23812',
  'https://www.smh.com.au/rss/world.xml',
  'https://www.state.gov/rss-feed/africa/feed/',
  'https://www.state.gov/rss-feed/east-asia-and-the-pacific/feed/',
  'https://www.state.gov/rss-feed/europe-and-eurasia/feed/',
  'https://www.state.gov/rss-feed/near-east/feed/',
  'https://www.state.gov/rss-feed/south-and-central-asia/feed/',
  'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=9&Site=945&max=10',
  'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362',
  'https://www.rt.com/rss/news/',
  'https://www.understandingwar.org/rss.xml',
  'https://www.understandingwar.org/feeds.xml',
  'https://www.cbc.ca/webfeed/rss/rss-world',
  'https://www.thecipherbrief.com/feed',
  'https://www.ctvnews.ca/rss/world/ctvnews-ca-world-public-rss-1.822289',
  'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511',
  'https://news.google.com/rss/search?q=site:twitter.com/centcom+when:7d',
  'https://news.google.com/rss/search?q=site:twitter.com/middleeasteye+when:7d',
  'https://news.google.com/rss/search?q=site:twitter.com/mondefense+when:7d',
  'https://news.google.com/rss/search?q=site:twitter.com/gardaworldc24+when:7d',
  'https://news.google.com/rss/search?q=site:twitter.com/aggregateosint+when:7d',
  'https://news.google.com/rss/search?q=site:twitter.com/thestudyofwar+when:7d',
  'https://news.google.com/rss/search?q=site:twitter.com/sentdefender+when:7d',
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
