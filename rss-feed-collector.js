document.addEventListener('DOMContentLoaded', () => {
  const feedsContainer = document.getElementById('feeds');
  const loadingOverlay = document.getElementById('loading-overlay');
  const timelineFilter = document.getElementById('timelineFilter');
  const topicFilter = document.getElementById('topicFilter');
  const sourceFilterContainer = document.getElementById('sourceFilterContainer');
  const toggleSourceFilterButton = document.getElementById('toggleSourceFilter');
  const searchInput = document.getElementById('searchInput');
  const statusContainer = document.getElementById('statusContainer');
  const refreshTimerDisplay = document.getElementById('refresh-timer');
  const volumeSlider = document.getElementById('volumeSlider');
  let feedItems = [];
  let latestFeedDate = new Date(0);
  let cache = new Map();
  let nextRefreshTime;
  let timerInterval;
  let pingVolume = 1;
  const statusItems = new Map();

  console.log("DOM fully loaded and parsed");

  const { format } = dateFns;

  const rssFeeds = [
    {
      url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
      source: 'The New York Times',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FHomePage.xml',
        'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml',
        'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FUS.xml'
      ]
    },
    {
      url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
      source: 'BBC News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml',
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml',
        'http://feeds.bbci.co.uk/news/uk/rss.xml'
      ]
    },
    {
      url: 'https://www.theguardian.com/world/rss',
      source: 'The Guardian',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.theguardian.com%2Fworld%2Frss',
        'https://corsproxy.io/?https%3A%2F%2Fwww.theguardian.com%2Fus%2Frss'
      ]
    },
    {
      url: 'https://www.aljazeera.com/xml/rss/all.xml',
      source: 'Al Jazeera - Latest',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.aljazeera.com%2Fxml%2Frss%2Fall.xml',
      ]
    },
    {
      url: 'https://wol.com/feed/',
      source: 'World Online',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwol.com%2Ffeed%2F',
      ]
    },
    {
      url: 'https://rss-bridge.org/bridge01/?action=display&topic=world-news&context=Custom+Topic&bridge=AssociatedPressNewsBridge&format=Atom',
      source: 'Associated Press',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss-bridge.org%2Fbridge01%2F%3Faction%3Ddisplay%26topic%3Dworld-news%26context%3DCustom%2BTopic%26bridge%3DAssociatedPressNewsBridge%26format%3DAtom',
      ]
    },
    {
      url: 'https://moxie.foxnews.com/google-publisher/world.xml',
      source: 'Fox News - World',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fmoxie.foxnews.com%2Fgoogle-publisher%2Fworld.xml',
      ]
    },
    {
      url: 'https://moxie.foxnews.com/google-publisher/latest.xml',
      source: 'Fox News Top Stories',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fmoxie.foxnews.com%2Fgoogle-publisher%2Flatest.xml',
      ]
    },
    {
      url: 'https://feeds.npr.org/1001/rss.xml',
      source: 'NPR News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.npr.org%2F1001%2Frss.xml',
      ]
    },
    {
      url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml',
      source: 'UN News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fnews.un.org%2Ffeed%2Fsubscribe%2Fen%2Fnews%2Fall%2Frss.xml',
      ]
    },
    {
      url: 'https://news.yahoo.com/rss/world',
      source: 'Yahoo News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fnews.yahoo.com%2Frss%2Fworld',
      ]
    },
    {
      url: 'https://www.politico.eu/feed/',
      source: 'Politico EU',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.politico.eu%2Ffeed%2F',
      ]
    },
    {
      url: 'https://www.thestar.com/search/?f=rss&t=article&c=news/world*&l=50&s=start_time&sd=desc',
      source: 'The Star',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.thestar.com%2Fsearch%2F%3Ff%3Drss%26t%3Darticle%26c%3Dnews%2Fworld*%26l%3D50%26s%3Dstart_time%26sd%3Ddesc',
      ]
    },
    {
      url: 'https://www.brandonsun.com/feed?path=%2Fnational%2Fbreaking-news',
      source: 'Brandon Sun',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.brandonsun.com%2Ffeed%3Fpath%3D%252Fnational%252Fbreaking-news',
      ]
    },
    {
      url: 'https://www.thehindubusinessline.com/news/?service=rss',
      source: 'The Hindu Business Line',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.thehindubusinessline.com%2Fnews%2F%3Fservice%3Drss',
      ]
    },
    {
      url: 'https://zeenews.india.com/rss/world-news.xml',
      source: 'Zee News India',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fzeenews.india.com%2Frss%2Fworld-news.xml',
      ]
    },
    {
      url: 'https://www.livemint.com/rss/politics',
      source: 'Live Mint India',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.livemint.com%2Frss%2Fpolitics',
      ]
    },
    {
      url: 'https://www.ft.com/world-uk?format=rss',
      source: 'Financial Times',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.ft.com%2Fworld-uk%3Fformat%3Drss',
      ]
    },
    {
      url: 'https://feeds.skynews.com/feeds/rss/politics.xml',
      source: 'Sky News Politics',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fpolitics.xml',
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fworld.xml',
      ]
    },
    {
      url: 'https://www.economist.com/europe/rss.xml',
      source: 'The Economist - Europe',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.economist.com%2Feurope%2Frss.xml',
      ]
    },
    {
      url: 'https://www.economist.com/the-americas/rss.xml',
      source: 'The Economist - Americas',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.economist.com%2Fthe-americas%2Frss.xml',
      ]
    },
    {
      url: 'https://www.economist.com/middle-east-and-africa/rss.xml',
      source: 'The Economist - MENA',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.economist.com%2Fmiddle-east-and-africa%2Frss.xml',
      ]
    },
    {
      url: 'https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/world/?outputType=xml&_website=nzh',
      source: 'The New Zealand Herald',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.nzherald.co.nz%2Farc%2Foutboundfeeds%2Frss%2Fsection%2Fworld%2F%3FoutputType%3Dxml%26_website%3Dnzh',
      ]
    },
    {
      url: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
      source: 'Wall Street Journal',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.a.dj.com%2Frss%2FRSSWorldNews.xml',
      ]
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsarabisraeliconflict.aspx',
      source: 'The Jerusalem Post - Arab-Israeli Conflict',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsarabisraeliconflict.aspx',
      ]
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsheadlines.aspx',
      source: 'The Jerusalem Post - Breaking News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsheadlines.aspx',
      ]
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsinternational',
      source: 'The Jerusalem Post - World News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsinternational',
      ]
    },
    {
      url: 'https://rss.jpost.com/rss/israel-hamas-war',
      source: 'The Jerusalem Post - Israel-Hamas War',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Fisrael-hamas-war',
      ]
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsmiddleeastnews.aspx',
      source: 'The Jerusalem Post - Middle East News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsmiddleeastnews.aspx',
        'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsiran',
      ]
    },
    {
      url: 'https://rss.jpost.com/rss/rssukrainerussiawar',
      source: 'The Jerusalem Post - Ukraine-Russia War',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssukrainerussiawar',
      ]
    },
    {
      url: 'https://rss.jpost.com/rss/rssfeedsgaza.aspx',
      source: 'The Jerusalem Post - Gaza',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsgaza.aspx',
      ]
    },
    {
      url: 'https://thehill.com/feed/?feed=partnerfeed-news-feed&format=rss',
      source: 'The Hill',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fthehill.com%2Ffeed%2F%3Ffeed%3Dpartnerfeed-news-feed%26format%3Drss',
      ]
    },
    {
      url: 'https://nypost.com/feed/',
      source: 'New York Post',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fnypost.com%2Ffeed%2F',
      ]
    },
    {
      url: 'https://news.usni.org/feed',
      source: 'USNI News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fnews.usni.org%2Ffeed',
      ]
    },
    {
      url: 'https://www.israelhayom.com/feed/',
      source: 'Israel Hayom',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.israelhayom.com%2Ffeed%2F',
      ]
    },
    {
      url: 'https://kyivindependent.com/news-archive/rss/',
      source: 'The Kyiv Independent',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fkyivindependent.com%2Fnews-archive%2Frss%2F',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zobo_egviy',
      source: 'VOA News - East Asia',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzobo_egviy',
      ]
    },
    {
      url: 'https://www.voanews.com/api/z-botevtiq',
      source: 'VOA News - Africa',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz-botevtiq',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zmjuqteb_kqo',
      source: 'VOA News - China News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzmjuqteb_kqo',
      ]
    },
    {
      url: 'https://www.voanews.com/api/z_-mqyerv_qv',
      source: 'VOA News - South and Central Asia',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz_-mqyerv_qv',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zrbopeuvim',
      source: 'VOA News - Middle East',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzrbopeuvim',
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzvgmqieo__qm',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zjboveytit',
      source: 'VOA News - Europe',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzjboveytit',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zt_rqyeirqqy',
      source: 'VOA News - Ukraine',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzt_rqyeirqqy',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zoripegtim',
      source: 'VOA News - Americas',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzoripegtim',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zbuiqyetppqv',
      source: 'VOA News - Extremism Watch',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzbuiqyetppqv',
      ]
    },
    {
      url: 'https://www.voanews.com/api/ziu-qoejibqo',
      source: 'VOA News - Flashpoint Global Crises',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fziu-qoejibqo',
      ]
    },
    {
      url: 'https://www.voanews.com/api/z-ukqqevpgqi',
      source: 'VOA News - Flashpoint Ukraine',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz-ukqqevpgqi',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zumgqoepbgqp',
      source: 'VOA News - International Edition',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzumgqoepbgqp',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zvq-qveok-qv',
      source: 'VOA News - Issues in the News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzvq-qveok-qv',
      ]
    },
    {
      url: 'https://www.voanews.com/api/zmbjqvebv-qr',
      source: 'VOA News - Fact Checks',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzmbjqvebv-qr',
      ]
    },
    {
      url: 'https://blog.4president.us/2024/atom.xml',
      source: 'Blog4President',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fblog.4president.us%2F2024%2Fatom.xml',
        'https://corsproxy.io/?https%3A%2F%2Fblog.4president.us%2F2024%2Findex.rdf',
        'https://corsproxy.io/?https%3A%2F%2Fblog.4president.us%2F2024%2Frss.xml',
      ]
    },
    {
      url: 'https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&isdashboardselected=0&max=20&Category=23812',
      source: 'Space Force News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.spaceforce.mil%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D1%26Site%3D1060%26isdashboardselected%3D0%26max%3D20%26Category%3D23812',
      ]
    },
    {
      url: 'https://www.smh.com.au/rss/world.xml',
      source: 'Sydney Morning Herald',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.smh.com.au%2Frss%2Fworld.xml',
      ]
    },
    {
      url: 'https://www.state.gov/rss-feed/africa/feed/',
      source: 'U.S. State Department - Africa',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fafrica%2Ffeed%2F',
      ]
    },
    {
      url: 'https://www.state.gov/rss-feed/east-asia-and-the-pacific/feed/',
      source: 'U.S. State Department - East Asia and the Pacific',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Feast-asia-and-the-pacific%2Ffeed%2F',
      ]
    },
    {
      url: 'https://www.state.gov/rss-feed/europe-and-eurasia/feed/',
      source: 'U.S. State Department - Europe and Eurasia',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Feurope-and-eurasia%2Ffeed%2F',
      ]
    },
    {
      url: 'https://www.state.gov/rss-feed/near-east/feed/',
      source: 'U.S. State Department - Near East',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fnear-east%2Ffeed%2F',
      ]
    },
    {
      url: 'https://www.state.gov/rss-feed/south-and-central-asia/feed/',
      source: 'U.S. State Department - South and Central Asia',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fsouth-and-central-asia%2Ffeed%2F',
      ]
    },
    {
      url: 'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=9&Site=945&max=10',
      source: 'U.S. Department of Defense',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.defense.gov%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D9%26Site%3D945%26max%3D10',
      ]
    },
    {
      url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362',
      source: 'CNBC',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fsearch.cnbc.com%2Frs%2Fsearch%2Fcombinedcms%2Fview.xml%3FpartnerId%3Dwrss01%26id%3D100727362',
      ]
    },
    {
      url: 'https://www.rt.com/rss/news/',
      source: 'RT World News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.rt.com%2Frss%2Fnews%2F',
      ]
    },
    {
      url: 'https://www.understandingwar.org/rss.xml',
      source: 'ISW',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.understandingwar.org%2Frss.xml',
        'https://corsproxy.io/?https%3A%2F%2Fwww.understandingwar.org%2Ffeeds.xml',
      ]
    },
    {
      url: 'https://www.cbc.ca/webfeed/rss/rss-world',
      source: 'CBC',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.cbc.ca%2Fwebfeed%2Frss%2Frss-world',
      ]
    },
    {
      url: 'https://www.thecipherbrief.com/feed',
      source: 'Cipher Brief',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.thecipherbrief.com%2Ffeed',
      ]
    },
    {
      url: 'https://www.ctvnews.ca/rss/world/ctvnews-ca-world-public-rss-1.822289',
      source: 'CTV News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.ctvnews.ca%2Frss%2Fworld%2Fctvnews-ca-world-public-rss-1.822289',
      ]
    },
    {
      url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511',
      source: 'Channel News Asia',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.channelnewsasia.com%2Fapi%2Fv1%2Frss-outbound-feed%3F_format%3Dxml%26category%3D6511',
      ]
    },
    {
      url: 'https://feeds.buzzsprout.com/1759080.rss',
      source: 'Factal Forecast',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.buzzsprout.com%2F1759080.rss',
      ]
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

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    for (const url of [feed.url, ...(feed.backups || [])]) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch from ${url}`);
        }
        const data = await response.text(); // Fetch the raw text as it is XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        const items = xmlDoc.querySelectorAll('item');
        let feedItems = [];

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

        updateStatus(feed.source, feed.url, true);
        return feedItems;
      } catch (error) {
        console.error(`Error fetching RSS feed from ${feed.source}:`, error);
        updateStatus(feed.source, feed.url, false);
        if (retries > 0) {
          await delay(2000); // wait before retrying
          return fetchFeed(feed, retries - 1);
        }
      }
    }
    return [];
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
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Al Jazeera - World') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
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
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Breaking News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - World News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Israel-Hamas War') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Middle East News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Ukraine-Russia War') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'The Jerusalem Post - Gaza') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
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
      adjustedDate.setHours(adjustedDate.getHours() - 0);
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
    } else if (source === 'CTV News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Channel News Asia') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Factal Forecast') {
      adjustedDate.setHours(adjustedDate.getHours() - 3);
    } else {
      console.warn(`No specific time adjustment found for source: ${source}`);
    }

    return adjustedDate;
  }

  async function fetchFeedsSequentially() {
    const interval = 3000; // 3 seconds interval
    const fetchInterval = 180000; // 3 minutes interval
    let delayOffset = 0;

    // Fetch all feeds initially
    await Promise.all(rssFeeds.map(feed => fetchFeedAndUpdate(feed)));

    rssFeeds.forEach((feed, index) => {
      console.log(`Scheduling fetch for ${feed.source} with delay of ${delayOffset} ms`);
      setTimeout(() => {
        fetchFeedAndUpdate(feed);
        setInterval(() => {
          console.log(`Periodic fetch for ${feed.source}`);
          fetchFeedAndUpdate(feed);
        }, fetchInterval);
      }, delayOffset);

      delayOffset += interval;
    });
  }

  async function fetchFeedAndUpdate(feed) {
    console.log(`Fetching feed from ${feed.source}`);
    const cacheTime = cache.get(feed.url) && cache.get(feed.url).timestamp;
    const now = new Date().getTime();

    if (cacheTime && (now - cacheTime < CACHE_EXPIRATION)) {
      displayFeeds(); // Use cached data if not expired
    } else {
      const data = await fetchFeed(feed);
      cache.set(feed.url, {
        data,
        timestamp: new Date().getTime()
      });
      feedItems = [...feedItems.filter(item => item.source !== feed.source), ...data];
      feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by date, newest first

      if (data.length > 0 && data[0].pubDate > latestFeedDate) {
        latestFeedDate = data[0].pubDate;
        playSound();
      }

      displayFeeds();
    }
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

    const now = new Date();
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));

    const filteredFeeds = applyFilter();
    const searchTerm = searchInput.value.trim().toLowerCase();
    const searchTerms = parseSearchTerm(searchTerm);

    // Filter out items older than one year
    const recentFeeds = filteredFeeds.filter(item => item.pubDate > oneYearAgo);

    const searchFilteredFeeds = recentFeeds.filter(item =>
      searchTerms.every(termGroup =>
        termGroup.some(term =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.source.toLowerCase().includes(term)
        )
      )
    );

    const fragment = document.createDocumentFragment();
    searchFilteredFeeds.forEach(item => {
      const feedElement = document.createElement('div');
      feedElement.classList.add('feed');

      // Add error handling to images with fallback image URL
      let imageHtml = '';
      if (item.image) {
        imageHtml = `<img src="${item.image}" alt="Feed image" onerror="this.onerror=null;this.src='https://i.imgur.com/GQPN5Q9.jpeg';" />`;
      }

      feedElement.innerHTML = `
        <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
        ${imageHtml}
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

  timelineFilter.addEventListener('change', debounce(displayFeeds, 300));
  topicFilter.addEventListener('change', debounce(displayFeeds, 300));
  sourceFilterContainer.addEventListener('change', debounce(displayFeeds, 300));
  searchInput.addEventListener('input', debounce(displayFeeds, 300));
  volumeSlider.addEventListener('input', (event) => {
    pingVolume = event.target.value;
    console.log('Volume slider value:', pingVolume);
  });

  populateSourceFilter();
  fetchFeedsSequentially();
});
