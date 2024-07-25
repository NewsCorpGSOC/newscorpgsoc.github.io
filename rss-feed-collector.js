document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');
  const loadingOverlay = document.getElementById('loading-overlay');
  const timelineFilter = document.getElementById('timelineFilter');
  const topicFilter = document.getElementById('topicFilter');
  const sourceFilterContainer = document.getElementById('sourceFilterContainer');
  const toggleSourceFilterButton = document.getElementById('toggleSourceFilter');
  const searchInput = document.getElementById('searchInput');
  const updateFrequency = document.getElementById('updateFrequency');
  const statusContainer = document.getElementById('statusContainer');
  const refreshTimerDisplay = document.getElementById('refresh-timer');
  const volumeSlider = document.getElementById('volumeSlider');
  let feedItems = [];
  let latestFeedDate = new Date(0);
  let updateInterval;
  let cache = new Map();
  let nextRefreshTime;
  let timerInterval;
  let pingVolume = 1;
  const statusItems = new Map();

  console.log("DOM fully loaded and parsed");

  const { format } = dateFns;

  const rssFeeds = [
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FHomePage.xml',
      source: 'The New York Times',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml',
        'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FUS.xml'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml',
      source: 'BBC News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml',
        'http://feeds.bbci.co.uk/news/uk/rss.xml'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.theguardian.com%2Fworld%2Frss',
      source: 'The Guardian',
      backups: [
        'https://www.theguardian.com/uk/rss',
        'https://www.theguardian.com/us/rss'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.aljazeera.com%2Fxml%2Frss%2Fall.xml',
      source: 'Al Jazeera - Latest'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwol.com%2Ffeed%2F',
      source: 'World Online'
    },
    {
      url: 'https://rss-bridge.org/bridge01/?action=display&topic=world-news&context=Custom+Topic&bridge=AssociatedPressNewsBridge&format=Atom',
      source: 'Associated Press'
    },
    {
      url: 'https://moxie.foxnews.com/google-publisher/world.xml',
      source: 'Fox News - World'
    },
    {
      url: 'https://moxie.foxnews.com/google-publisher/latest.xml',
      source: 'Fox News Top Stories'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Ffeeds.npr.org%2F1001%2Frss.xml',
      source: 'NPR News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fnews.un.org%2Ffeed%2Fsubscribe%2Fen%2Fnews%2Fall%2Frss.xml',
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
      url: 'https://thehill.com/feed/?feed=partnerfeed-news-feed&format=rss',
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
/*----------------------------SOCIAL MEDIA--------------------------------*/
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
    },
  ];
  
  rssFeeds.sort((a, b) => a.source.localeCompare(b.source));

  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function populateSourceFilter() {
    const uniqueSources = [...new Set(rssFeeds.map(feed => feed.source))];
    uniqueSources.sort().forEach(source => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = source;
      checkbox.name = 'sourceFilter';
      checkbox.value = source;
      checkbox.checked = true;

      const label = document.createElement('label');
      label.htmlFor = source;
      label.textContent = source;

      const container = document.createElement('div');
      container.appendChild(checkbox);
      container.appendChild(label);

      sourceFilterContainer.appendChild(container);
    });
  }

  toggleSourceFilterButton.addEventListener('click', () => {
    const isHidden = sourceFilterContainer.style.display === 'none';
    sourceFilterContainer.style.display = isHidden ? 'block' : 'none';
    toggleSourceFilterButton.textContent = isHidden ? 'Hide Source Filter' : 'Show Source Filter';
  });

  const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour
  const RETRIES = 3;

  const fetchFeed = async (feed, retries = RETRIES) => {
    try {
      const response = await fetch(feed.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${feed.url}`);
      }
      const data = await response.json();
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

      updateStatus(feed.source, feed.url, true);
      return feedItems;
    } catch (error) {
      console.error(`Error fetching RSS feed from ${feed.source}:`, error);
      updateStatus(feed.source, feed.url, false);
      if (retries > 0) {
        await delay(2000); // wait before retrying
        return fetchFeed(feed, retries - 1);
      }
      return [];
    }
  };

  function updateStatus(source, url, success) {
    const statusHtml = `${success ? '✅' : '❌'} <a href="${url}" target="_blank">${source}</a>`;
    statusItems.set(source, statusHtml);  // Update the status map

    // Sort the status items alphabetically by source
    const sortedStatusItems = Array.from(statusItems.entries()).sort(([sourceA], [sourceB]) => sourceA.localeCompare(sourceB));

    // Clear the status container and re-append sorted status items
    statusContainer.innerHTML = '';
    sortedStatusItems.forEach(([source, html]) => {
      const statusItem = document.createElement('div');
      statusItem.dataset.source = source;
      statusItem.innerHTML = html;
      statusContainer.appendChild(statusItem);
    });
  }
  
  function parseDate(dateString) {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate)) {
      throw new Error(`Invalid date value: ${dateString}`);
    }
    return parsedDate;
  }

  function convertToPacificTime(date, source) {
    let adjustedDate = new Date(date);

    // Prioritize source-specific adjustments
    if (source === 'The Kyiv Independent') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Hill') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The New York Times') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'BBC News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Guardian') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Al Jazeera - Latest') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Al Jazeera - World') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'World Online') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Associated Press') {
      adjustedDate.setHours(adjustedDate.getHours() - 10);
    } else if (source === 'Fox News - World') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Fox News Top Stories') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'NPR News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'UN News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
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
      adjustedDate.setHours(adjustedDate.getHours() + 0.5);
    } else if (source === 'Zee News India') {
      adjustedDate.setHours(adjustedDate.getHours() - 12.5);
    } else if (source === 'Live Mint India') {
      adjustedDate.setHours(adjustedDate.getHours() - 6.5);
    } else if (source === 'Financial Times') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Channel 4 News') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Sky News Politics') {
      adjustedDate.setHours(adjustedDate.getHours() - 8);
    } else if (source === 'The Economist - Europe') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Economist - Americas') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Economist - MENA') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The New Zealand Herald') {
      adjustedDate.setHours(adjustedDate.getHours() - 3);
    } else if (source === 'Wall Street Journal') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'The Jerusalem Post - Arab-Israeli Conflict') {
      adjustedDate.setHours(adjustedDate.getHours() + 3);
    } else if (source === 'The Jerusalem Post - Breaking News') {
      adjustedDate.setHours(adjustedDate.getHours() + 3);
    } else if (source === 'The Jerusalem Post - World News') {
      adjustedDate.setHours(adjustedDate.getHours() + 3);
    } else if (source === 'The Jerusalem Post - Israel-Hamas War') {
      adjustedDate.setHours(adjustedDate.getHours() + 3);
    } else if (source === 'The Jerusalem Post - Middle East News') {
      adjustedDate.setHours(adjustedDate.getHours() + 3);
    } else if (source === 'The Jerusalem Post - Ukraine-Russia War') {
      adjustedDate.setHours(adjustedDate.getHours() + 3);
    } else if (source === 'The Jerusalem Post - Gaza') {
      adjustedDate.setHours(adjustedDate.getHours() + 3);
    } else if (source === 'New York Post') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'USNI News') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Israel Hayom') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'VOA News - East Asia') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - China News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Africa') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Middle East') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Europe') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Ukraine') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Americas') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Extremism Watch') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Flashpoint Global Crises') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - International Edition') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - South and Central Asia') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Issues in the News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Flashpoint Ukraine') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'VOA News - Fact Checks') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Blog4President') {
      adjustedDate.setHours(adjustedDate.getHours() - 2);
    } else if (source === 'Space Force News') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Sydney Morning Herald') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'U.S. State Department - Africa') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. State Department - East Asia and the Pacific') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. State Department - Europe and Eurasia') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. State Department - Near East') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. State Department - South and Central Asia') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'U.S. Department of Defense') {
      adjustedDate.setHours(adjustedDate.getHours() - 2);
    } else if (source === 'CNBC') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'RT World News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'ISW') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'CBC') {
      adjustedDate.setHours(adjustedDate.getHours() - 3);
    } else if (source === 'Cipher Brief') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'USCENTCOM - TwitterX') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Middle East Eye - TwitterX') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Taiwan Ministry of National Defense - TwitterX') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Crisis24 - TwitterX') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'OSINT Aggregator - TwitterX') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Institute for the Study of War - TwitterX') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'OSINT Defender - TwitterX') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'CTV News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Channel News Asia') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else {
      console.warn(`No specific time adjustment found for source: ${source}`);
    }

    return adjustedDate;
  }

  async function fetchFeeds() {
    loadingOverlay.style.display = 'flex';

    const fetchPromises = rssFeeds.map(feed => {
      const cacheTime = cache.get(feed.url) && cache.get(feed.url).timestamp;
      const now = new Date().getTime();

      if (cacheTime && (now - cacheTime < CACHE_EXPIRATION)) {
        return Promise.resolve(cache.get(feed.url).data);
      } else {
        return fetchFeed(feed).then(data => {
          cache.set(feed.url, {
            data,
            timestamp: new Date().getTime()
          });
          return data;
        });
      }
    });

    const results = await Promise.all(fetchPromises);
    const newFeedItems = results.flat().sort((a, b) => b.pubDate - a.pubDate);

    const hasNewItems = newFeedItems.some(item => item.pubDate > latestFeedDate);

    if (hasNewItems) {
      console.log('New items detected, playing sound');
      playSound();
      latestFeedDate = newFeedItems[0].pubDate;
    }

    feedItems = newFeedItems;

    loadingOverlay.style.display = 'none';
    displayFeeds();
    resetRefreshTimer();
  }

  function playSound() {
    console.log('Playing sound at volume:', pingVolume);
    const audio = new Audio('sounds/news-alert-notification.mp3');
    audio.volume = pingVolume;
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  }

  function displayFeeds() {
    feedsContainer.innerHTML = '';
    const filteredFeeds = applyFilter();
    const searchTerm = searchInput.value.trim().toLowerCase();
    const searchTerms = parseSearchTerm(searchTerm);

    const searchFilteredFeeds = filteredFeeds.filter(item =>
      searchTerms.every(termGroup =>
        termGroup.some(term =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.source.toLowerCase().includes(term)
        )
      )
    );
  
    console.log('Filtered feeds:', searchFilteredFeeds);

    const fragment = document.createDocumentFragment();
    searchFilteredFeeds.forEach(item => {
      const feedElement = document.createElement('div');
      feedElement.classList.add('feed');
      feedElement.innerHTML = `
        <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
        <p>${item.description}</p>
        <p><small>Published on: ${format(item.pubDate, 'PPpp')} (PST/PDT)</small></p>
        <p><strong>Source:</strong> ${item.source}</p>
      `;
      fragment.appendChild(feedElement);
    });
    feedsContainer.appendChild(fragment);
  }
  
  function parseSearchTerm(searchTerm) {
    const termGroups = searchTerm.split(/\s+OR\s+/i).map(group => {
      return group.split(/\s+AND\s+/i).map(term => term.replace(/"/g, '').trim());
    });
    return termGroups;
  }

  function applyFilter() {
    const now = new Date();
    let filteredFeeds = [...feedItems];

    const timelineValue = timelineFilter.value;
    if (timelineValue === 'lastHour') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 3600000);
    } else if (timelineValue === 'last12Hours') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 43200000);
    } else if (timelineValue === 'lastDay') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 86400000);
    }

    const topicKeywords = {
      'Russia': ['Russia', 'Ukraine', 'Kyiv', 'Kharkiv', 'Belarus', 'Donbas', 'Crimea'],
      'Israel': ['Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank'],
      'MENA': ['Lebanon', 'Syria', 'Iraq', 'Iran', 'Islamic Resistance', 'Houthi', 'Yemen', 'Saudi Arabia', 'UAE', 'United Arab Emirates', 'Turkey', 'Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank', 'Jordan', 'IRGC', 'Hezbollah'],
      'Protests': ['protest', 'march', 'rally', 'demonstration', 'strike', 'riot', 'vigil'],
      'Weather': ['climate', 'environment', 'storm', 'tornado', 'hurricane', 'heatwave', 'earthquake', 'tsunami'],
      // Add more topics and their corresponding keywords here
    };

    const topicValue = topicFilter.value;
    if (topicValue !== 'all' && topicKeywords[topicValue]) {
      const keywords = topicKeywords[topicValue].map(keyword => keyword.toLowerCase());
      filteredFeeds = filteredFeeds.filter(item =>
        keywords.some(keyword => item.description.toLowerCase().includes(keyword))
      );
    }

    const checkedSources = Array.from(document.querySelectorAll('input[name="sourceFilter"]:checked')).map(cb => cb.value);
    if (checkedSources.length > 0 && !checkedSources.includes('all')) {
      filteredFeeds = filteredFeeds.filter(item => checkedSources.includes(item.source));
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

    nextRefreshTime = Date.now() + frequency;
    startRefreshTimer();
  }

  function startRefreshTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
      const remainingTime = nextRefreshTime - Date.now();
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        refreshTimerDisplay.textContent = '00:00';
      } else {
        const minutes = String(Math.floor(remainingTime / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, '0');
        refreshTimerDisplay.textContent = `${minutes}:${seconds}`;
      }
    }, 1000);
  }

  function resetRefreshTimer() {
    nextRefreshTime = Date.now() + parseInt(updateFrequency.value, 10);
    startRefreshTimer();
  }

  timelineFilter.addEventListener('change', debounce(displayFeeds, 300));
  topicFilter.addEventListener('change', debounce(displayFeeds, 300));
  sourceFilterContainer.addEventListener('change', debounce(displayFeeds, 300));
  searchInput.addEventListener('input', debounce(displayFeeds, 300));
  updateFrequency.addEventListener('change', setUpdateInterval);
  volumeSlider.addEventListener('input', (event) => {
    pingVolume = event.target.value;
    console.log('Volume slider value:', pingVolume);
  });

  populateSourceFilter();
  fetchFeeds();
  setUpdateInterval();
});
