const rssFeeds = [
  {
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    source: 'The New York Times',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml',
      'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FHomePage.xml',
      'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FWorld.xml',
      'https://corsproxy.io/?https%3A%2F%2Frss.nytimes.com%2Fservices%2Fxml%2Frss%2Fnyt%2FUS.xml'
    ]
  },
  {
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    source: 'BBC News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml',
      'https://corsproxy.io/?https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml',
      'https://corsproxy.io/?https%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml',
      'http://feeds.bbci.co.uk/news/uk/rss.xml'
    ]
  },
  {
    url: 'https://www.theguardian.com/world/rss',
    source: 'The Guardian',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.theguardian.com%2Fworld%2Frss',
      'https://corsproxy.io/?https%3A%2F%2Fwww.theguardian.com%2Fworld%2Frss',
      'https://corsproxy.io/?https%3A%2F%2Fwww.theguardian.com%2Fworld%2Frss',
      'https://corsproxy.io/?https%3A%2F%2Fwww.theguardian.com%2Fus%2Frss'
    ]
  },
  {
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
    source: 'Al Jazeera - Latest',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.aljazeera.com%2Fxml%2Frss%2Fall.xml',
      'https://corsproxy.io/?https%3A%2F%2Fwww.aljazeera.com%2Fxml%2Frss%2Fall.xml',
    ]
  },
  {
    url: 'https://wol.com/feed/',
    source: 'World Online',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwol.com%2Ffeed%2F',
      'https://corsproxy.io/?https%3A%2F%2Fwol.com%2Ffeed%2F',
    ]
  },
  {
    url: 'https://rss-bridge.org/bridge01/?action=display&topic=world-news&context=Custom+Topic&bridge=AssociatedPressNewsBridge&format=Atom',
    source: 'Associated Press',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frss-bridge.org%2Fbridge01%2F%3Faction%3Ddisplay%26topic%3Dworld-news%26context%3DCustom%2BTopic%26bridge%3DAssociatedPressNewsBridge%26format%3DAtom',
      'https://corsproxy.io/?https%3A%2F%2Frss-bridge.org%2Fbridge01%2F%3Faction%3Ddisplay%26topic%3Dworld-news%26context%3DCustom%2BTopic%26bridge%3DAssociatedPressNewsBridge%26format%3DAtom',
    ]
  },
  {
    url: 'https://moxie.foxnews.com/google-publisher/world.xml',
    source: 'Fox News - World',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fmoxie.foxnews.com%2Fgoogle-publisher%2Fworld.xml',
      'https://corsproxy.io/?https%3A%2F%2Fmoxie.foxnews.com%2Fgoogle-publisher%2Fworld.xml',
    ]
  },
  {
    url: 'https://moxie.foxnews.com/google-publisher/latest.xml',
    source: 'Fox News Top Stories',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fmoxie.foxnews.com%2Fgoogle-publisher%2Flatest.xml',
      'https://corsproxy.io/?https%3A%2F%2Fmoxie.foxnews.com%2Fgoogle-publisher%2Flatest.xml',
    ]
  },
  {
    url: 'https://feeds.npr.org/1001/rss.xml',
    source: 'NPR News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Ffeeds.npr.org%2F1001%2Frss.xml',
      'https://corsproxy.io/?https%3A%2F%2Ffeeds.npr.org%2F1001%2Frss.xml',
    ]
  },
  {
    url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml',
    source: 'UN News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fnews.un.org%2Ffeed%2Fsubscribe%2Fen%2Fnews%2Fall%2Frss.xml',
      'https://corsproxy.io/?https%3A%2F%2Fnews.un.org%2Ffeed%2Fsubscribe%2Fen%2Fnews%2Fall%2Frss.xml',
    ]
  },
  {
    url: 'https://news.yahoo.com/rss/world',
    source: 'Yahoo News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fnews.yahoo.com%2Frss%2Fworld',
      'https://corsproxy.io/?https%3A%2F%2Fnews.yahoo.com%2Frss%2Fworld',
    ]
  },
  {
    url: 'https://www.politico.eu/feed/',
    source: 'Politico EU',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.politico.eu%2Ffeed%2F',
      'https://corsproxy.io/?https%3A%2F%2Fwww.politico.eu%2Ffeed%2F',
    ]
  },
  {
    url: 'https://www.thestar.com/search/?f=rss&t=article&c=news/world*&l=50&s=start_time&sd=desc',
    source: 'The Star',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.thestar.com%2Fsearch%2F%3Ff%3Drss%26t%3Darticle%26c%3Dnews%2Fworld*%26l%3D50%26s%3Dstart_time%26sd%3Ddesc',
      'https://corsproxy.io/?https%3A%2F%2Fwww.thestar.com%2Fsearch%2F%3Ff%3Drss%26t%3Darticle%26c%3Dnews%2Fworld*%26l%3D50%26s%3Dstart_time%26sd%3Ddesc',
    ]
  },
  {
    url: 'https://www.brandonsun.com/feed?path=%2Fnational%2Fbreaking-news',
    source: 'Brandon Sun',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.brandonsun.com%2Ffeed%3Fpath%3D%252Fnational%252Fbreaking-news',
      'https://corsproxy.io/?https%3A%2F%2Fwww.brandonsun.com%2Ffeed%3Fpath%3D%252Fnational%252Fbreaking-news',
    ]
  },
  {
    url: 'https://www.thehindubusinessline.com/news/?service=rss',
    source: 'The Hindu Business Line',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.thehindubusinessline.com%2Fnews%2F%3Fservice%3Drss',
      'https://corsproxy.io/?https%3A%2F%2Fwww.thehindubusinessline.com%2Fnews%2F%3Fservice%3Drss',
    ]
  },
  {
    url: 'https://zeenews.india.com/rss/world-news.xml',
    source: 'Zee News India',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fzeenews.india.com%2Frss%2Fworld-news.xml',
      'https://corsproxy.io/?https%3A%2F%2Fzeenews.india.com%2Frss%2Fworld-news.xml',
    ]
  },
  {
    url: 'https://www.livemint.com/rss/politics',
    source: 'Live Mint India',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.livemint.com%2Frss%2Fpolitics',
      'https://corsproxy.io/?https%3A%2F%2Fwww.livemint.com%2Frss%2Fpolitics',
    ]
  },
  {
    url: 'https://www.ft.com/world-uk?format=rss',
    source: 'Financial Times',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.ft.com%2Fworld-uk%3Fformat%3Drss',
      'https://corsproxy.io/?https%3A%2F%2Fwww.ft.com%2Fworld-uk%3Fformat%3Drss',
    ]
  },
  {
    url: 'https://feeds.skynews.com/feeds/rss/politics.xml',
    source: 'Sky News Politics',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fpolitics.xml',
      'https://corsproxy.io/?https%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fpolitics.xml',
      'https://corsproxy.io/?https%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fworld.xml',
    ]
  },
  {
    url: 'https://www.economist.com/europe/rss.xml',
    source: 'The Economist - Europe',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.economist.com%2Feurope%2Frss.xml',
      'https://corsproxy.io/?https%3A%2F%2Fwww.economist.com%2Feurope%2Frss.xml',
    ]
  },
  {
    url: 'https://www.economist.com/the-americas/rss.xml',
    source: 'The Economist - Americas',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.economist.com%2Fthe-americas%2Frss.xml',
      'https://corsproxy.io/?https%3A%2F%2Fwww.economist.com%2Fthe-americas%2Frss.xml',
    ]
  },
  {
    url: 'https://www.economist.com/middle-east-and-africa/rss.xml',
    source: 'The Economist - MENA',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.economist.com%2Fmiddle-east-and-africa%2Frss.xml',
      'https://corsproxy.io/?https%3A%2F%2Fwww.economist.com%2Fmiddle-east-and-africa%2Frss.xml',
    ]
  },
  {
    url: 'https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/world/?outputType=xml&_website=nzh',
    source: 'The New Zealand Herald',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.nzherald.co.nz%2Farc%2Foutboundfeeds%2Frss%2Fsection%2Fworld%2F%3FoutputType%3Dxml%26_website%3Dnzh',
      'https://corsproxy.io/?https%3A%2F%2Fwww.nzherald.co.nz%2Farc%2Foutboundfeeds%2Frss%2Fsection%2Fworld%2F%3FoutputType%3Dxml%26_website%3Dnzh',
    ]
  },
  {
    url: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
    source: 'Wall Street Journal',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Ffeeds.a.dj.com%2Frss%2FRSSWorldNews.xml',
      'https://corsproxy.io/?https%3A%2F%2Ffeeds.a.dj.com%2Frss%2FRSSWorldNews.xml',
    ]
  },
  {
    url: 'https://rss.jpost.com/rss/rssfeedsarabisraeliconflict.aspx',
    source: 'The Jerusalem Post - Arab-Israeli Conflict',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsarabisraeliconflict.aspx',
      'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsarabisraeliconflict.aspx',
    ]
  },
  {
    url: 'https://rss.jpost.com/rss/rssfeedsheadlines.aspx',
    source: 'The Jerusalem Post - Breaking News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsheadlines.aspx',
      'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsheadlines.aspx',
    ]
  },
  {
    url: 'https://rss.jpost.com/rss/rssfeedsinternational',
    source: 'The Jerusalem Post - World News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsinternational',
      'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsinternational',
    ]
  },
  {
    url: 'https://rss.jpost.com/rss/israel-hamas-war',
    source: 'The Jerusalem Post - Israel-Hamas War',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frss.jpost.com%2Frss%2Fisrael-hamas-war',
      'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Fisrael-hamas-war',
    ]
  },
  {
    url: 'https://rss.jpost.com/rss/rssfeedsmiddleeastnews.aspx',
    source: 'The Jerusalem Post - Middle East News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsmiddleeastnews.aspx',
      'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsmiddleeastnews.aspx',
      'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsiran',
    ]
  },
  {
    url: 'https://rss.jpost.com/rss/rssukrainerussiawar',
    source: 'The Jerusalem Post - Ukraine-Russia War',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frss.jpost.com%2Frss%2Frssukrainerussiawar',
      'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssukrainerussiawar',
    ]
  },
  {
    url: 'https://rss.jpost.com/rss/rssfeedsgaza.aspx',
    source: 'The Jerusalem Post - Gaza',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsgaza.aspx',
      'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsgaza.aspx',
    ]
  },
  {
    url: 'https://thehill.com/feed/?feed=partnerfeed-news-feed&format=rss',
    source: 'The Hill',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fthehill.com%2Ffeed%2F%3Ffeed%3Dpartnerfeed-news-feed%26format%3Drss',
      'https://corsproxy.io/?https%3A%2F%2Fthehill.com%2Ffeed%2F%3Ffeed%3Dpartnerfeed-news-feed%26format%3Drss',
    ]
  },
  {
    url: 'https://nypost.com/feed/',
    source: 'New York Post',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fnypost.com%2Ffeed%2F',
      'https://corsproxy.io/?https%3A%2F%2Fnypost.com%2Ffeed%2F',
    ]
  },
  {
    url: 'https://news.usni.org/feed',
    source: 'USNI News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fnews.usni.org%2Ffeed',
      'https://corsproxy.io/?https%3A%2F%2Fnews.usni.org%2Ffeed',
    ]
  },
  {
    url: 'https://www.israelhayom.com/feed/',
    source: 'Israel Hayom',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.israelhayom.com%2Ffeed%2F',
      'https://corsproxy.io/?https%3A%2F%2Fwww.israelhayom.com%2Ffeed%2F',
    ]
  },
  {
    url: 'https://kyivindependent.com/news-archive/rss/',
    source: 'The Kyiv Independent',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fkyivindependent.com%2Fnews-archive%2Frss%2F',
      'https://corsproxy.io/?https%3A%2F%2Fkyivindependent.com%2Fnews-archive%2Frss%2F',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zobo_egviy',
    source: 'VOA News - East Asia',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzobo_egviy',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzobo_egviy',
    ]
  },
  {
    url: 'https://www.voanews.com/api/z-botevtiq',
    source: 'VOA News - Africa',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz-botevtiq',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz-botevtiq',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zmjuqteb_kqo',
    source: 'VOA News - China News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzmjuqteb_kqo',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzmjuqteb_kqo',
    ]
  },
  {
    url: 'https://www.voanews.com/api/z_-mqyerv_qv',
    source: 'VOA News - South and Central Asia',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz_-mqyerv_qv',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz_-mqyerv_qv',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zrbopeuvim',
    source: 'VOA News - Middle East',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzrbopeuvim',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzrbopeuvim',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzvgmqieo__qm',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zjboveytit',
    source: 'VOA News - Europe',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzjboveytit',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzjboveytit',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zt_rqyeirqqy',
    source: 'VOA News - Ukraine',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzt_rqyeirqqy',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzt_rqyeirqqy',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zoripegtim',
    source: 'VOA News - Americas',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzoripegtim',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzoripegtim',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zbuiqyetppqv',
    source: 'VOA News - Extremism Watch',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzbuiqyetppqv',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzbuiqyetppqv',
    ]
  },
  {
    url: 'https://www.voanews.com/api/ziu-qoejibqo',
    source: 'VOA News - Flashpoint Global Crises',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fziu-qoejibqo',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fziu-qoejibqo',
    ]
  },
  {
    url: 'https://www.voanews.com/api/z-ukqqevpgqi',
    source: 'VOA News - Flashpoint Ukraine',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz-ukqqevpgqi',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz-ukqqevpgqi',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zumgqoepbgqp',
    source: 'VOA News - International Edition',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzumgqoepbgqp',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzumgqoepbgqp',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zvq-qveok-qv',
    source: 'VOA News - Issues in the News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzvq-qveok-qv',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzvq-qveok-qv',
    ]
  },
  {
    url: 'https://www.voanews.com/api/zmbjqvebv-qr',
    source: 'VOA News - Fact Checks',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzmbjqvebv-qr',
      'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzmbjqvebv-qr',
    ]
  },
  {
    url: 'https://blog.4president.us/2024/atom.xml',
    source: 'Blog4President',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fblog.4president.us%2F2024%2Fatom.xml',
      'https://corsproxy.io/?https%3A%2F%2Fblog.4president.us%2F2024%2Fatom.xml',
      'https://corsproxy.io/?https%3A%2F%2Fblog.4president.us%2F2024%2Findex.rdf',
      'https://corsproxy.io/?https%3A%2F%2Fblog.4president.us%2F2024%2Frss.xml',
    ]
  },
  {
    url: 'https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&isdashboardselected=0&max=20&Category=23812',
    source: 'Space Force News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.spaceforce.mil%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D1%26Site%3D1060%26isdashboardselected%3D0%26max%3D20%26Category%3D23812',
      'https://corsproxy.io/?https%3A%2F%2Fwww.spaceforce.mil%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D1%26Site%3D1060%26isdashboardselected%3D0%26max%3D20%26Category%3D23812',
    ]
  },
  {
    url: 'https://www.smh.com.au/rss/world.xml',
    source: 'Sydney Morning Herald',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.smh.com.au%2Frss%2Fworld.xml',
      'https://corsproxy.io/?https%3A%2F%2Fwww.smh.com.au%2Frss%2Fworld.xml',
    ]
  },
  {
    url: 'https://www.state.gov/rss-feed/africa/feed/',
    source: 'U.S. State Department - Africa',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fafrica%2Ffeed%2F',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fafrica%2Ffeed%2F',
    ]
  },
  {
    url: 'https://www.state.gov/rss-feed/east-asia-and-the-pacific/feed/',
    source: 'U.S. State Department - East Asia and the Pacific',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Feast-asia-and-the-pacific%2Ffeed%2F',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.state.gov%2Frss-feed%2Feast-asia-and-the-pacific%2Ffeed%2F',
    ]
  },
  {
    url: 'https://www.state.gov/rss-feed/europe-and-eurasia/feed/',
    source: 'U.S. State Department - Europe and Eurasia',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Feurope-and-eurasia%2Ffeed%2F',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.state.gov%2Frss-feed%2Feurope-and-eurasia%2Ffeed%2F',
    ]
  },
  {
    url: 'https://www.state.gov/rss-feed/near-east/feed/',
    source: 'U.S. State Department - Near East',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fnear-east%2Ffeed%2F',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fnear-east%2Ffeed%2F',
    ]
  },
  {
    url: 'https://www.state.gov/rss-feed/south-and-central-asia/feed/',
    source: 'U.S. State Department - South and Central Asia',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fsouth-and-central-asia%2Ffeed%2F',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fsouth-and-central-asia%2Ffeed%2F',
    ]
  },
  {
    url: 'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=9&Site=945&max=10',
    source: 'U.S. Department of Defense',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.defense.gov%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D9%26Site%3D945%26max%3D10',
      'https://corsproxy.io/?https%3A%2F%2Fwww.defense.gov%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D9%26Site%3D945%26max%3D10',
    ]
  },
  {
    url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362',
    source: 'CNBC',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fsearch.cnbc.com%2Frs%2Fsearch%2Fcombinedcms%2Fview.xml%3FpartnerId%3Dwrss01%26id%3D100727362',
      'https://corsproxy.io/?https%3A%2F%2Fsearch.cnbc.com%2Frs%2Fsearch%2Fcombinedcms%2Fview.xml%3FpartnerId%3Dwrss01%26id%3D100727362',
    ]
  },
  {
    url: 'https://www.understandingwar.org/rss.xml',
    source: 'ISW',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.understandingwar.org%2Frss.xml',
      'https://corsproxy.io/?https%3A%2F%2Fwww.understandingwar.org%2Frss.xml',
      'https://corsproxy.io/?https%3A%2F%2Fwww.understandingwar.org%2Ffeeds.xml',
    ]
  },
  {
    url: 'https://www.cbc.ca/webfeed/rss/rss-world',
    source: 'CBC',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.cbc.ca%2Fwebfeed%2Frss%2Frss-world',
      'https://corsproxy.io/?https%3A%2F%2Fwww.cbc.ca%2Fwebfeed%2Frss%2Frss-world',
    ]
  },
  {
    url: 'https://www.thecipherbrief.com/feed',
    source: 'Cipher Brief',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.thecipherbrief.com%2Ffeed',
      'https://corsproxy.io/?https%3A%2F%2Fwww.thecipherbrief.com%2Ffeed',
    ]
  },
  {
    url: 'https://www.ctvnews.ca/rss/world/ctvnews-ca-world-public-rss-1.822289',
    source: 'CTV News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.ctvnews.ca%2Frss%2Fworld%2Fctvnews-ca-world-public-rss-1.822289',
      'https://corsproxy.io/?https%3A%2F%2Fwww.ctvnews.ca%2Frss%2Fworld%2Fctvnews-ca-world-public-rss-1.822289',
    ]
  },
  {
    url: 'https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511',
    source: 'Channel News Asia',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.channelnewsasia.com%2Fapi%2Fv1%2Frss-outbound-feed%3F_format%3Dxml%26category%3D6511',
      'https://corsproxy.io/?https%3A%2F%2Fwww.channelnewsasia.com%2Fapi%2Fv1%2Frss-outbound-feed%3F_format%3Dxml%26category%3D6511',
    ]
  },
  {
    url: 'https://feeds.buzzsprout.com/1759080.rss',
    source: 'Factal Forecast',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Ffeeds.buzzsprout.com%2F1759080.rss',
      'https://corsproxy.io/?https%3A%2F%2Ffeeds.buzzsprout.com%2F1759080.rss',
    ]
  },
  {
    url: 'https://worldnewsera.com/feed/',
    source: 'World News Era',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fworldnewsera.com%2Ffeed%2F',
      'https://corsproxy.io/?https%3A%2F%2Fworldnewsera.com%2Ffeed%2F',
    ]
  },
  {
    url: 'https://www.scmp.com/rss/91/feed',
    source: 'South China Morning Post',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.scmp.com%2Frss%2F91%2Ffeed',
      'https://corsproxy.io/?https%3A%2F%2Fwww.scmp.com%2Frss%2F91%2Ffeed',
    ]
  },
  {
    url: 'https://www.euronews.com/rss?level=vertical&name=news',
    source: 'Euro News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.euronews.com%2Frss%3Flevel%3Dvertical%26name%3Dnews',
      'https://corsproxy.io/?https%3A%2F%2Fwww.euronews.com%2Frss%3Flevel%3Dvertical%26name%3Dnews',
    ]
  },
  {
    url: 'https://thefederalist.com/feed/',
    source: 'The Federalist',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Fthefederalist.com%2Ffeed%2F',
      'https://corsproxy.io/?https%3A%2F%2Fthefederalist.com%2Ffeed%2F',
    ]
  },
  {
    url: 'https://www.reddit.com/r/breakingnews/new.rss',
    source: 'Breaking News Subreddit',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.reddit.com%2Fr%2Fbreakingnews.rss',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fbreakingnews.rss',
    ]
  },
  {
    url: 'https://www.reddit.com/r/YemeniCrisis/new.rss',
    source: 'Yemeni Crisis Subreddit',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.reddit.com%2Fr%2FYemeniCrisis%2Fnew.rss',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.reddit.com%2Fr%2FYemeniCrisis%2Fnew.rss',
    ]
  },
  {
    url: 'https://www.reddit.com/r/worldnews/rising.rss',
    source: 'World News Subreddit',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.reddit.com%2Fr%2Fworldnews%2Frising.rss',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.reddit.com%2Fr%2Fworldnews%2Frising.rss',
    ]
  },
  {
    url: 'https://www.reddit.com/r/InternationalNews.rss',
    source: 'International News Subreddit',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.reddit.com%2Fr%2FInternationalNews.rss',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.reddit.com%2Fr%2FInternationalNews.rss',
    ]
  },
  {
    url: 'https://www.naharnet.com/tags/lebanon/en/feed.atom',
    source: 'Naharnet - Lebanon',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.naharnet.com%2Ftags%2Flebanon%2Fen%2Ffeed.atom',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.naharnet.com%2Ftags%2Flebanon%2Fen%2Ffeed.atom',
    ]
  },
  {
    url: 'https://www.naharnet.com/tags/middle-east/en/feed.atom',
    source: 'Naharnet - Middle East',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fwww.naharnet.com%2Ftags%2Fmiddle-east%2Fen%2Ffeed.atom',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.naharnet.com%2Ftags%2Fmiddle-east%2Fen%2Ffeed.atom',
    ]
  },
  {
    url: 'https://rsshub.app/telegram/channel/WOLPalestine',
    source: 'WOLPalestine Telegram',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2FWOLPalestine',
      'https://api.allorigins.win/get?url=https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2FWOLPalestine',
    ]
  },
  {
    url: 'https://corsproxy.io/?https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2Fkpszsu',
    source: 'Air Force of the Armed Forces of Ukraine Telegram',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://rsshub.app/telegram/channel/kpszsu',
      'https://api.allorigins.win/get?url=https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2Fkpszsu',
    ]
  },
  {
    url: 'https://api.weather.gov/alerts/active.atom?certainty=Likely%2CObserved&severity=Extreme%2CSevere&urgency=Future%2CExpected%2CImmediate',
    source: 'National Weather Service',
    priorityLevel: 'Very Low',
    requiredTerms: ['Federal Way', 'Seattle', 'San Francisco', 'Los Angeles', 'San Jose', 'Santa Clara', ' Westlake Village', 'Minneapolis', 'Phoenix', 'Scottsdale', 'Plano', 'Spokane', 'LaGrange', 'White Oak', 'Silver Springs', 'Boston', 'Chicago', 'Chicopee', 'Detroit', 'Princeton', 'Washington', 'Seacaucua', 'New York City', 'Grand Rapids', 'LaPorte', 'Morgantown', 'New York', 'Nashville', 'Depew', 'Miami', 'Houston', 'Dallas'],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fapi.weather.gov%2Falerts%2Factive.atom%3Fcertainty%3DLikely%252CObserved%26severity%3DExtreme%252CSevere%26urgency%3DFuture%252CExpected%252CImmediate',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fapi.weather.gov%2Falerts%2Factive.atom%3Fcertainty%3DLikely%252CObserved%26severity%3DExtreme%252CSevere%26urgency%3DFuture%252CExpected%252CImmediate',
    ]
  },
  {
    url: 'https://rss-bridge.org/bridge01/?action=display&username=News_cabinet_news&bridge=TelegramBridge&format=Atom',
    source: 'Israel Security Cabinet News Telegram',
    priorityLevel: 'High',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://rsshub.woodland.cafe/telegram/channel/News_cabinet_news',
      'https://api.allorigins.win/get?url=https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2FNews_cabinet_news',
      'https://corsproxy.io/?https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2FNews_cabinet_news',
    ]
  },
  {
    url: 'https://rsshub.viki.moe/telegram/channel/Saba_Newsye',
    source: 'Saba Agency Telegram',
    priorityLevel: 'High',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2FSaba_Newsye',
    ]
  },
  {
    url: 'https://rss.peachyjoy.top/telegram/channel/epochtimes',
    source: 'Epoch Times Telegram',
    priorityLevel: 'High',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2Fepochtimes',
    ]
  },
  {
    url: 'https://rss-bridge.org/bridge01/?action=display&username=StandWithUsBreakingNews&bridge=TelegramBridge&format=Atom',
    source: 'Stand With Us Breaking News Telegram',
    priorityLevel: 'High',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://api.allorigins.win/get?url=https%3A%2F%2Frsshub.speednet.icu%2Ftelegram%2Fchannel%2FStandWithUsBreakingNews',
      'https://corsproxy.io/?https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2FStandWithUsBreakingNews',
    ]
  },
  {
    url: 'https://global.shakemovie.princeton.edu/shakemovie/rss',
    source: 'Global Shake Princeton',
    priorityLevel: 'Low',
    requiredTerms: [],
    ignoreTerms: [],
    backups: [
      'https://corsproxy.io/?https%3A%2F%2Fglobal.shakemovie.princeton.edu%2Fshakemovie%2Frss',
    ]
  },
];

export default rssFeeds;
