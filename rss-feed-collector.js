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
      url: 'https://corsproxy.io/?https%3A%2F%2Fnews.yahoo.com%2Frss%2Fworld',
      source: 'Yahoo News'
    },
    //{ --------------------Required "Human" Verification ---------------------
    //  url: 'https://www.politico.com/rss/politicopicks.xml',
    //  source: 'Politico'
    //},
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.politico.eu%2Ffeed%2F',
      source: 'Politico EU'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.thestar.com%2Fsearch%2F%3Ff%3Drss%26t%3Darticle%26c%3Dnews%2Fworld*%26l%3D50%26s%3Dstart_time%26sd%3Ddesc',
      source: 'The Star'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.brandonsun.com%2Ffeed%3Fpath%3D%252Fnational%252Fbreaking-news',
      source: 'Brandon Sun'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.thehindubusinessline.com%2Fnews%2F%3Fservice%3Drss',
      source: 'The Hindu Business Line'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fzeenews.india.com%2Frss%2Fworld-news.xml',
      source: 'Zee News India'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.livemint.com%2Frss%2Fpolitics',
      source: 'Live Mint India'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.ft.com%2Fworld-uk%3Fformat%3Drss',
      source: 'Financial Times'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fpolitics.xml',
      source: 'Sky News Politics'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fpolitics.xml',
      source: 'Sky News Politics',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Ffeeds.skynews.com%2Ffeeds%2Frss%2Fworld.xml'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.economist.com%2Feurope%2Frss.xml',
      source: 'The Economist - Europe'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.economist.com%2Fthe-americas%2Frss.xml',
      source: 'The Economist - Americas'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.economist.com%2Fmiddle-east-and-africa%2Frss.xml',
      source: 'The Economist - MENA'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.nzherald.co.nz%2Farc%2Foutboundfeeds%2Frss%2Fsection%2Fworld%2F%3FoutputType%3Dxml%26_website%3Dnzh',
      source: 'The New Zealand Herald'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Ffeeds.a.dj.com%2Frss%2FRSSWorldNews.xml',
      source: 'Wall Street Journal'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsarabisraeliconflict.aspx',
      source: 'The Jerusalem Post - Arab-Israeli Conflict'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsheadlines.aspx',
      source: 'The Jerusalem Post - Breaking News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsinternational',
      source: 'The Jerusalem Post - World News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Fisrael-hamas-war',
      source: 'The Jerusalem Post - Israel-Hamas War'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsmiddleeastnews.aspx',
      source: 'The Jerusalem Post - Middle East News',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsiran'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssukrainerussiawar',
      source: 'The Jerusalem Post - Ukraine-Russia War'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Frss.jpost.com%2Frss%2Frssfeedsgaza.aspx',
      source: 'The Jerusalem Post - Gaza'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fthehill.com%2Ffeed%2F%3Ffeed%3Dpartnerfeed-news-feed%26format%3Drss',
      source: 'The Hill'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fnypost.com%2Ffeed%2F',
      source: 'New York Post'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fnews.usni.org%2Ffeed',
      source: 'USNI News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.israelhayom.com%2Ffeed%2F',
      source: 'Israel Hayom'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fkyivindependent.com%2Fnews-archive%2Frss%2F',
      source: 'The Kyiv Independent'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzobo_egviy',
      source: 'VOA News - East Asia'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz-botevtiq',
      source: 'VOA News - Africa'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzmjuqteb_kqo',
      source: 'VOA News - China News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz_-mqyerv_qv',
      source: 'VOA News - South and Central Asia'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzrbopeuvim',
      source: 'VOA News - Middle East',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzvgmqieo__qm'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzjboveytit',
      source: 'VOA News - Europe'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzt_rqyeirqqy',
      source: 'VOA News - Ukraine'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzoripegtim',
      source: 'VOA News - Americas'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzbuiqyetppqv',
      source: 'VOA News - Extremism Watch'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fziu-qoejibqo',
      source: 'VOA News - Flashpoint Global Crises'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fz-ukqqevpgqi',
      source: 'VOA News - Flashpoint Ukraine'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzumgqoepbgqp',
      source: 'VOA News - International Edition'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzvq-qveok-qv',
      source: 'VOA News - Issues in the News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.voanews.com%2Fapi%2Fzmbjqvebv-qr',
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
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.spaceforce.mil%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D1%26Site%3D1060%26isdashboardselected%3D0%26max%3D20%26Category%3D23812',
      source: 'Space Force News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.smh.com.au%2Frss%2Fworld.xml',
      source: 'Sydney Morning Herald'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fafrica%2Ffeed%2F',
      source: 'U.S. State Department - Africa'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Feast-asia-and-the-pacific%2Ffeed%2F',
      source: 'U.S. State Department - East Asia and the Pacific'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Feurope-and-eurasia%2Ffeed%2F',
      source: 'U.S. State Department - Europe and Eurasia'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fnear-east%2Ffeed%2F',
      source: 'U.S. State Department - Near East'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.state.gov%2Frss-feed%2Fsouth-and-central-asia%2Ffeed%2F',
      source: 'U.S. State Department - South and Central Asia'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.defense.gov%2FDesktopModules%2FArticleCS%2FRSS.ashx%3FContentType%3D9%26Site%3D945%26max%3D10',
      source: 'U.S. Department of Defense'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fsearch.cnbc.com%2Frs%2Fsearch%2Fcombinedcms%2Fview.xml%3FpartnerId%3Dwrss01%26id%3D100727362',
      source: 'CNBC'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.rt.com%2Frss%2Fnews%2F',
      source: 'RT World News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.understandingwar.org%2Frss.xml',
      source: 'ISW',
      backups: [
        'https://corsproxy.io/?https%3A%2F%2Fwww.understandingwar.org%2Ffeeds.xml'
      ]
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.cbc.ca%2Fwebfeed%2Frss%2Frss-world',
      source: 'CBC'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.thecipherbrief.com%2Ffeed',
      source: 'Cipher Brief'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.ctvnews.ca%2Frss%2Fworld%2Fctvnews-ca-world-public-rss-1.822289',
      source: 'CTV News'
    },
    {
      url: 'https://corsproxy.io/?https%3A%2F%2Fwww.channelnewsasia.com%2Fapi%2Fv1%2Frss-outbound-feed%3F_format%3Dxml%26category%3D6511',
      source: 'Channel News Asia'
    },
    {
      url: 'https://feeds.buzzsprout.com/1759080.rss',
      source: 'Factal Forecast'
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
    try {
      const response = await fetch(feed.url);
      if (!response.ok) {
        throw new Error(`Failed to fetch from ${feed.url}`);
      }
      const text = await response.text(); // Retrieve the response as text
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'application/xml');
      const items = xmlDoc.querySelectorAll('item, entry'); // Support both RSS (item) and Atom (entry) formats

      let feedItems = [];
      
      items.forEach(item => {
        const title = item.querySelector('title')?.textContent || 'No title';
        let link = item.querySelector('link')?.textContent || '#';
        if (link === '#') {
          const linkElement = item.querySelector('link[rel="alternate"]');
          if (linkElement) {
            link = linkElement.getAttribute('href');
          }
        }
        const description = item.querySelector('description, summary')?.textContent || 'No description';
        const pubDateText = item.querySelector('pubDate, updated')?.textContent;
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

    for (const feed of rssFeeds) {
      // Set up the interval to fetch each feed every 3 minutes, staggered by the initial delay
      setTimeout(() => {
        fetchFeedAndUpdate(feed);
        setInterval(() => fetchFeedAndUpdate(feed), fetchInterval);
      }, delayOffset);

      delayOffset += interval;
    }
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
