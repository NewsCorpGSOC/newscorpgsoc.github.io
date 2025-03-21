const PROXY_URL = 'http://localhost:3000/rss?url=';

const rssFeeds = [
  {
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    source: 'The New York Times - World',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: []
  },
  {
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml',
    source: 'The New York Times - Politics',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: []
  },
  {
    url: 'https://moxie.foxnews.com/google-publisher/world.xml',
    source: 'Fox News - World',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://moxie.foxnews.com/google-publisher/world.xml',
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
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://moxie.foxnews.com/google-publisher/latest.xml',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fmoxie.foxnews.com%2Fgoogle-publisher%2Flatest.xml',
      'https://corsproxy.io/?https%3A%2F%2Fmoxie.foxnews.com%2Fgoogle-publisher%2Flatest.xml',
    ]
  },
  {
    url: 'https://news.un.org/feed/subscribe/en/news/all/rss.xml',
    source: 'UN News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://news.un.org/feed/subscribe/en/news/all/rss.xml',
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
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://news.yahoo.com/rss/world',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fnews.yahoo.com%2Frss%2Fworld',
      'https://corsproxy.io/?https%3A%2F%2Fnews.yahoo.com%2Frss%2Fworld',
    ]
  },
  {
    url: 'https://www.thestar.com/search/?f=rss&t=article&c=news/world*&l=50&s=start_time&sd=desc',
    source: 'The Star',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.thestar.com/search/?f=rss&t=article&c=news/world*&l=50&s=start_time&sd=desc',
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
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.brandonsun.com/feed?path=%2Fnational%2Fbreaking-news',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.brandonsun.com%2Ffeed%3Fpath%3D%252Fnational%252Fbreaking-news',
      'https://corsproxy.io/?https%3A%2F%2Fwww.brandonsun.com%2Ffeed%3Fpath%3D%252Fnational%252Fbreaking-news',
    ]
  },
  {
    url: 'https://www.ft.com/world-uk?format=rss',
    source: 'Financial Times',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.ft.com/world-uk?format=rss',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.ft.com%2Fworld-uk%3Fformat%3Drss',
      'https://corsproxy.io/?https%3A%2F%2Fwww.ft.com%2Fworld-uk%3Fformat%3Drss',
    ]
  },
  {
    url: 'https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/world/?outputType=xml&_website=nzh',
    source: 'The New Zealand Herald',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/world/?outputType=xml&_website=nzh',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.nzherald.co.nz%2Farc%2Foutboundfeeds%2Frss%2Fsection%2Fworld%2F%3FoutputType%3Dxml%26_website%3Dnzh',
      'https://corsproxy.io/?https%3A%2F%2Fwww.nzherald.co.nz%2Farc%2Foutboundfeeds%2Frss%2Fsection%2Fworld%2F%3FoutputType%3Dxml%26_website%3Dnzh',
    ]
  },
  {
    url: 'https://thehill.com/feed/?feed=partnerfeed-news-feed&format=rss',
    source: 'The Hill',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://thehill.com/feed/?feed=partnerfeed-news-feed&format=rss',
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
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://nypost.com/feed/',
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
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://news.usni.org/feed',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fnews.usni.org%2Ffeed',
      'https://corsproxy.io/?https%3A%2F%2Fnews.usni.org%2Ffeed',
    ]
  },
  {
    url: 'https://kyivindependent.com/news-archive/rss/',
    source: 'The Kyiv Independent',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://kyivindependent.com/news-archive/rss/',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fkyivindependent.com%2Fnews-archive%2Frss%2F',
      'https://corsproxy.io/?https%3A%2F%2Fkyivindependent.com%2Fnews-archive%2Frss%2F',
    ]
  },
  {
    url: 'https://blog.4president.us/2024/atom.xml',
    source: 'Blog4President',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://blog.4president.us/2024/atom.xml',
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
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.spaceforce.mil/DesktopModules/ArticleCS/RSS.ashx?ContentType=1&Site=1060&isdashboardselected=0&max=20&Category=23812',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.spaceforce.mil%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D1%26Site%3D1060%26isdashboardselected%3D0%26max%3D20%26Category%3D23812',
      'https://corsproxy.io/?https%3A%2F%2Fwww.spaceforce.mil%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D1%26Site%3D1060%26isdashboardselected%3D0%26max%3D20%26Category%3D23812',
    ]
  },
  {
    url: 'https://www.smh.com.au/rss/world.xml',
    source: 'Sydney Morning Herald',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: ['World of photos'],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.smh.com.au/rss/world.xml',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.smh.com.au%2Frss%2Fworld.xml',
      'https://corsproxy.io/?https%3A%2F%2Fwww.smh.com.au%2Frss%2Fworld.xml',
    ]
  },
  {
    url: 'https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=9&Site=945&max=10',
    source: 'U.S. Department of Defense',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.defense.gov/DesktopModules/ArticleCS/RSS.ashx?ContentType=9&Site=945&max=10',
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
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fsearch.cnbc.com%2Frs%2Fsearch%2Fcombinedcms%2Fview.xml%3FpartnerId%3Dwrss01%26id%3D100727362',
      'https://corsproxy.io/?https%3A%2F%2Fsearch.cnbc.com%2Frs%2Fsearch%2Fcombinedcms%2Fview.xml%3FpartnerId%3Dwrss01%26id%3D100727362',
    ]
  },
  {
    url: 'https://www.cbc.ca/webfeed/rss/rss-world',
    source: 'CBC',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.cbc.ca/webfeed/rss/rss-world',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fwww.cbc.ca%2Fwebfeed%2Frss%2Frss-world',
      'https://corsproxy.io/?https%3A%2F%2Fwww.cbc.ca%2Fwebfeed%2Frss%2Frss-world',
    ]
  },
  {
    url: 'https://www.ctvnews.ca/rss/world/ctvnews-ca-world-public-rss-1.822289',
    source: 'CTV News',
    priorityLevel: 'Very Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.ctvnews.ca/rss/world/ctvnews-ca-world-public-rss-1.822289',
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
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511',
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
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://feeds.buzzsprout.com/1759080.rss',
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
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://worldnewsera.com/feed/',
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
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.scmp.com/rss/91/feed',
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
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.euronews.com/rss?level=vertical&name=news',
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
    reliability: 'Requires Verification',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://thefederalist.com/feed/',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fthefederalist.com%2Ffeed%2F',
      'https://corsproxy.io/?https%3A%2F%2Fthefederalist.com%2Ffeed%2F',
    ]
  },
  {
    url: 'https://api.weather.gov/alerts/active.atom?certainty=Likely%2CObserved&severity=Extreme%2CSevere&urgency=Future%2CExpected%2CImmediate',
    source: 'National Weather Service',
    priorityLevel: 'High',
    requiredTerms: ['Federal Way', 'Seattle', 'San Francisco', 'Los Angeles', 'San Jose', 'Santa Clara', ' Westlake Village', 'Minneapolis', 'Phoenix', 'Scottsdale', 'Plano', 'Spokane', 'LaGrange', 'White Oak', 'Silver Springs', 'Boston', 'Chicago', 'Chicopee', 'Detroit', 'Princeton', 'Washington', 'Seacaucua', 'New York City', 'Grand Rapids', 'LaPorte', 'Morgantown', 'New York', 'Nashville', 'Depew', 'Miami', 'Houston', 'Dallas'],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://api.weather.gov/alerts/active.atom?certainty=Likely%2CObserved&severity=Extreme%2CSevere&urgency=Future%2CExpected%2CImmediate',
      'https://corsproxy.io/?https%3A%2F%2Fapi.weather.gov%2Falerts%2Factive.atom%3Fcertainty%3DLikely%252CObserved%26severity%3DExtreme%252CSevere%26urgency%3DFuture%252CExpected%252CImmediate',
      'https://api.allorigins.win/get?url=https%3A%2F%2Fapi.weather.gov%2Falerts%2Factive.atom%3Fcertainty%3DLikely%252CObserved%26severity%3DExtreme%252CSevere%26urgency%3DFuture%252CExpected%252CImmediate',
    ]
  },
  {
    url: 'https://rsshub.viki.moe/telegram/channel/Saba_Newsye',
    source: 'Saba Agency Telegram',
    priorityLevel: 'High',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Requires Verification',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://rsshub.viki.moe/telegram/channel/Saba_Newsye',
      'https://corsproxy.io/?https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2FSaba_Newsye',
    ]
  },
  {
    url: 'https://rss.peachyjoy.top/telegram/channel/epochtimes',
    source: 'Epoch Times Telegram',
    priorityLevel: 'High',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://rss.peachyjoy.top/telegram/channel/epochtimes',
      'https://corsproxy.io/?https%3A%2F%2Frsshub.app%2Ftelegram%2Fchannel%2Fepochtimes',
    ]
  },
  {
    url: 'http://www.bom.gov.au/fwo/IDZ00058.warnings_tas.xml',
    source: 'Australia Bureau of Meteorology - Tasmania',
    priorityLevel: 'High',
    requiredTerms: ['Burnie', 'Hobart', 'Launceston'],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}http://www.bom.gov.au/fwo/IDZ00058.warnings_tas.xml',
      'https://corsproxy.io/?http%3A%2F%2Fwww.bom.gov.au%2Ffwo%2FIDZ00058.warnings_tas.xml',
    ]
  },
  {
    url: 'http://www.bom.gov.au/fwo/IDZ00054.warnings_nsw.xml',
    source: 'Australia Bureau of Meteorology - News South Wales and ACT',
    priorityLevel: 'High',
    requiredTerms: ['Albury', 'Canberra', 'Sydney', 'Grafton', 'Ballina', 'Coffs Harbour', 'Lismore', 'Tweed Heads'],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}http://www.bom.gov.au/fwo/IDZ00054.warnings_nsw.xml',
      'https://corsproxy.io/?http%3A%2F%2Fwww.bom.gov.au%2Ffwo%2FIDZ00054.warnings_nsw.xml',
    ]
  },
  {
    url: 'http://www.bom.gov.au/fwo/IDZ00059.warnings_vic.xml',
    source: 'Australia Bureau of Meteorology - Victoria',
    priorityLevel: 'High',
    requiredTerms: ['Hamilton', 'Melbourne', 'Geelong'],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}http://www.bom.gov.au/fwo/IDZ00059.warnings_vic.xml',
      'https://corsproxy.io/?http%3A%2F%2Fwww.bom.gov.au%2Ffwo%2FIDZ00059.warnings_vic.xml',
    ]
  },
  {
    url: 'http://www.bom.gov.au/fwo/IDZ00056.warnings_qld.xml',
    source: 'Australia Bureau of Meteorology - Queensland',
    priorityLevel: 'High',
    requiredTerms: ['Stanthorpe', 'Robina', 'Southport', 'Gold Coast', 'Ipswich', 'Dalby', 'Chinchilla', 'Gatton', 'Brisbane', 'Sunshine Coast', 'Maroochydore', 'Noosaville', 'Kingaroy', 'St George', 'Roma', 'Charleville', 'Gympie', 'Maryborough', 'Hervey Bay', 'Biggenden', 'Gayndah', 'Bundaberg', 'Biloela', 'Gladstone', 'Yeppoon', 'Rockhampton', 'Emerald', 'Mackay', 'Cannonvale', 'Bowen', 'Charters Towers', 'Ayr', 'Townsville', 'Ingham', 'Innisfail', 'Atherton', 'Port Douglas', 'Cairns'],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}http://www.bom.gov.au/fwo/IDZ00056.warnings_qld.xml',
      'https://corsproxy.io/?http%3A%2F%2Fwww.bom.gov.au%2Ffwo%2FIDZ00056.warnings_qld.xml',
    ]
  },
  {
    url: 'http://www.bom.gov.au/fwo/IDZ00060.warnings_wa.xml',
    source: 'Australia Bureau of Meteorology - West Australia',
    priorityLevel: 'High',
    requiredTerms: ['Perth'],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}http://www.bom.gov.au/fwo/IDZ00060.warnings_wa.xml',
      'https://corsproxy.io/?http%3A%2F%2Fwww.bom.gov.au%2Ffwo%2FIDZ00060.warnings_wa.xml',
    ]
  },
  {
    url: 'http://www.bom.gov.au/fwo/IDZ00057.warnings_sa.xml',
    source: 'Australia Bureau of Meteorology - South Australia',
    priorityLevel: 'High',
    requiredTerms: ['Adelaide'],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}http://www.bom.gov.au/fwo/IDZ00057.warnings_sa.xml',
      'https://corsproxy.io/?http%3A%2F%2Fwww.bom.gov.au%2Ffwo%2FIDZ00057.warnings_sa.xml',
    ]
  },
  {
    url: 'http://www.bom.gov.au/fwo/IDZ00055.warnings_nt.xml',
    source: 'Australia Bureau of Meteorology - Northern Territory',
    priorityLevel: 'High',
    requiredTerms: ['Darwin', 'Alice Springs'],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}http://www.bom.gov.au/fwo/IDZ00055.warnings_nt.xml',
      'https://corsproxy.io/?http%3A%2F%2Fwww.bom.gov.au%2Ffwo%2FIDZ00055.warnings_nt.xml',
    ]
  },
  {
    url: 'https://www.usnews.com/rss/news',
    source: 'US News',
    priorityLevel: 'Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.usnews.com/rss/new',
    ]
  },
  {
    url: 'https://www.turkiyetoday.com/world/feed/',
    source: 'Turkey Today',
    priorityLevel: 'Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.turkiyetoday.com/world/feed/',
    ]
  },
  {
    url: 'https://thecradle.co/feed',
    source: 'The Cradle',
    priorityLevel: 'Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://thecradle.co/feed',
    ]
  },
  {
    url: 'https://www.dropsitenews.com/feed',
    source: 'Drop Site News',
    priorityLevel: 'Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.dropsitenews.com/feed',
    ]
  },
  {
    url: 'https://www.navalnews.com/feed/',
    source: 'Naval News',
    priorityLevel: 'Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://www.navalnews.com/feed/',
    ]
  },
  {
    url: 'https://foreignpolicy.com/feed/',
    source: 'Foreign Policy News',
    priorityLevel: 'Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Credible',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://foreignpolicy.com/feed/',
    ]
  },
  {
    url: 'https://feeds.feedburner.com/ndtvnews-top-stories',
    source: 'NDTV India News',
    priorityLevel: 'Low',
    requiredTerms: [],
    ignoreTerms: [],
    reliability: 'Dubious',
    background: '#203050',
    backups: [
      '${PROXY_URL}https://feeds.feedburner.com/ndtvnews-top-stories',
    ]
  },
//  {
//    url: 'https://apiprevmet3.inmet.gov.br/avisos/rss',
//    source: 'Brazil Weather Alerts',
//    priorityLevel: 'High',
//    requiredTerms: ['o Paulo', 'Rio de Janeiro'],
//    ignoreTerms: [],
//    reliability: 'Credible',
//    background: '#203050',
//    backups: [
//  },
];

export default rssFeeds;
