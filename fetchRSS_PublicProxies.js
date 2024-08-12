const fs = require('fs');
const fetch = require('node-fetch');

const rssFeeds = [
  {
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    source: 'The New York Times',
    backups: [
      'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
      'https://rss.nytimes.com/services/xml/rss/nyt/US.xml'
    ]
  },
  {
    url: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    source: 'BBC News',
    backups: [
      'http://feeds.bbci.co.uk/news/rss.xml',
      'http://feeds.bbci.co.uk/news/uk/rss.xml'
    ]
  },
  {
    url: 'https://www.theguardian.com/world/rss',
    source: 'The Guardian',
    backups: [
      'https://www.theguardian.com/uk/rss',
      'https://www.theguardian.com/us/rss'
    ]
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
    url: 'https://feeds.skynews.com/feeds/rss/politics.xml',
    source: 'Sky News Politics'
  },
  {
    url: 'https://feeds.skynews.com/feeds/rss/politics.xml',
    source: 'Sky News Politics',
    backups: [
      'https://feeds.skynews.com/feeds/rss/world.xml'
    ]
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
    source: 'The Jerusalem Post - Middle East News',
    backups: [
      'https://rss.jpost.com/rss/rssfeedsiran'
    ]
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
  {
    url: 'https://www.voanews.com/api/zobo_egviy',
    source: 'VOA News - East Asia'
  },
  {
    url: 'https://www.voanews.com/api/z-botevtiq',
    source: 'VOA News - Africa'
  },
  {
    url: 'https://www.voanews.com/api/zmjuqteb_kqo',
    source: 'VOA News - China News'
  },
  {
    url: 'https://www.voanews.com/api/z_-mqyerv_qv',
    source: 'VOA News - South and Central Asia'
  },
  {
    url: 'https://www.voanews.com/api/zrbopeuvim',
    source: 'VOA News - Middle East',
    backups: [
      'https://www.voanews.com/api/zvgmqieo__qm'
    ]
  },
  {
    url: 'https://www.voanews.com/api/zjboveytit',
    source: 'VOA News - Europe'
  },
  {
    url: 'https://www.voanews.com/api/zt_rqyeirqqy',
    source: 'VOA News - Ukraine'
  },
  {
    url: 'https://www.voanews.com/api/zoripegtim',
    source: 'VOA News - Americas'
  },
  {
    url: 'https://www.voanews.com/api/zbuiqyetppqv',
    source: 'VOA News - Extremism Watch'
  },
  {
    url: 'https://www.voanews.com/api/ziu-qoejibqo',
    source: 'VOA News - Flashpoint Global Crises'
  },
  {
    url: 'https://www.voanews.com/api/z-ukqqevpgqi',
    source: 'VOA News - Flashpoint Ukraine'
  },
  {
    url: 'https://www.voanews.com/api/zumgqoepbgqp',
    source: 'VOA News - International Edition'
  },
  {
    url: 'https://www.voanews.com/api/zvq-qveok-qv',
    source: 'VOA News - Issues in the News'
  },
  {
    url: 'https://www.voanews.com/api/zmbjqvebv-qr',
    source: 'VOA News - Fact Checks'
  },
  {
    url: 'https://blog.4president.us/2024/atom.xml',
    source: 'Blog4President',
    backups: [
      'https://blog.4president.us/2024/index.rdf',
      'https://blog.4president.us/2024/rss.xml'
    ]
  },
  {
    url: 'https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&isdashboardselected=0&max=20&Category=23812',
    source: 'Space Force News'
  },
  {
    url: 'https://www.smh.com.au/rss/world.xml',
    source: 'Sydney Morning Herald'
  },
  {
    url: 'https://www.state.gov/rss-feed/africa/feed/',
    source: 'U.S. State Department - Africa'
  },
  {
    url: 'https://www.state.gov/rss-feed/east-asia-and-the-pacific/feed/',
    source: 'U.S. State Department - East Asia and the Pacific'
  },
  {
    url: 'https://www.state.gov/rss-feed/europe-and-eurasia/feed/',
    source: 'U.S. State Department - Europe and Eurasia'
  },
  {
    url: 'https://www.state.gov/rss-feed/near-east/feed/',
    source: 'U.S. State Department - Near East'
  },
  {
    url: 'https://www.state.gov/rss-feed/south-and-central-asia/feed/',
    source: 'U.S. State Department - South and Central Asia'
  },
  {
    url: 'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=9&Site=945&max=10',
    source: 'U.S. Department of Defense'
  },
  {
    url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362',
    source: 'CNBC'
  },
  {
    url: 'https://www.rt.com/rss/news/',
    source: 'RT World News'
  },
  {
    url: 'https://www.understandingwar.org/rss.xml',
    source: 'ISW',
    backups: [
      'https://www.understandingwar.org/feeds.xml'
    ]
  },
  {
    url: 'https://www.cbc.ca/webfeed/rss/rss-world',
    source: 'CBC'
  },
  {
    url: 'https://www.thecipherbrief.com/feed',
    source: 'Cipher Brief'
  },
  {
    url: 'https://www.ctvnews.ca/rss/world/ctvnews-ca-world-public-rss-1.822289',
    source: 'CTV News'
  },
  {
    url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511',
    source: 'Channel News Asia'
  },
  {
    url: 'https://news.google.com/rss/search?q=site:twitter.com/centcom+when:7d',
    source: 'USCENTCOM - TwitterX'
  },
  {
    url: 'https://news.google.com/rss/search?q=site:twitter.com/middleeasteye+when:7d',
    source: 'Middle East Eye - TwitterX'
  },
  {
    url: 'https://news.google.com/rss/search?q=site:twitter.com/mondefense+when:7d',
    source: 'Taiwan Ministry of National Defense - TwitterX'
  },
  {
    url: 'https://news.google.com/rss/search?q=site:twitter.com/gardaworldc24+when:7d',
    source: 'Crisis24 - TwitterX'
  },
  {
    url: 'https://news.google.com/rss/search?q=site:twitter.com/aggregateosint+when:7d',
    source: 'OSINT Aggregator - TwitterX'
  },
  {
    url: 'https://news.google.com/rss/search?q=site:twitter.com/thestudyofwar+when:7d',
    source: 'Institute for the Study of War - TwitterX'
  },
  {
    url: 'https://news.google.com/rss/search?q=site:twitter.com/sentdefender+when:7d',
    source: 'OSINT Defender - TwitterX'
  }
];

const fetchFeeds = async () => {
  let feedData = [];

  for (const feed of rssFeeds) {
    const urls = [feed.url, ...(feed.backups || [])];
    let success = false;

    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        const text = await response.text();
        feedData.push({ url, content: text });
        success = true;
        break;
      } catch (error) {
        console.error(`Error fetching feed from ${url}:`, error);
      }
    }

    if (!success) {
      console.error(`Failed to fetch feed from all URLs for source: ${feed.source}`);
    }
  }

  fs.writeFileSync('feeds.json', JSON.stringify(feedData, null, 2));
};

fetchFeeds();
