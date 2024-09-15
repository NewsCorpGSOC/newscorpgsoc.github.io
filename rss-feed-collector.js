import rssFeeds from './rssFeeds.js';

const topicKeywords = {
  'Weather': {
    keywords: ['weather', 'flood', 'climate', 'environment', 'storm', 'tornado', 'hurricane', 'heatwave', 'earthquake', 'tsunami'],
    background: '#5d5d55',
    soundFile: 'sounds/weather-alert-notification.mp3'
  },
  'Protests': {
    keywords: ['protest', 'rally', 'demonstration', 'riot', 'vigil'],
    background: '#5d555d',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
  'Russia': {
    keywords: ['Russia', 'Ukraine', 'Belarus', 'Donbas', 'Crimea', 'Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy', 'Sumy', 'Zhytomyr', 'Khmelnytskyi', 'Chernivtsi', 'Rivne', 'Ivano-Frankivsk', 'Ternopil', 'Kropyvnytskyi', 'Lutsk', 'Uzhhorod', 'Moscow', 'Saint Petersburg', 'Nizhny Novgorod', 'Kazan', 'Voronezh', 'Saratov', 'Krasnodar', 'Tolyatti', 'Izhevsk', 'Ulyanovsk', 'Yaroslavl', 'Tyumen', 'Barnaul', 'Vladivostok', 'Irkutsk', 'Khabarovsk', 'Kurgan', 'Kaliningrad', 'Belgorod', 'Ivanovo', 'Kostroma', 'Kursk', 'Lipetsk', 'Orel', 'Ryazan', 'Smolensk', 'Tula', 'Tver', 'Vladimir', 'Bryansk', 'Pskov', 'Novgorod', 'Kaluga', 'Tambov'],
    background: '#30563d',
    soundFile: 'sounds/ukraine-notification-alert.mp3'
  },
  'Israel': {
    keywords: ['Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank', 'Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Ashdod', 'Netanya', 'Beer Sheva', 'Bnei Brak', 'Holon', 'Ramat Gan', 'Ashkelon', 'Rehovot', 'Bat Yam', 'Kfar Saba', 'Herzliya', 'Modiin-Maccabim-Reut', 'Raanana', 'Beit Shemesh', 'Kiryat Ata', 'Lod', 'Nazareth', 'Ramla', 'Hadera', 'Betar Illit', 'Tiberias', 'Eilat', 'Acre', 'Hod Hasharon', 'Givatayim', 'Umm al-Fahm', 'Tayibe', 'Sakhnin', 'Karmiel', 'Tira', 'Sderot', 'Kiryat Gat', 'Kiryat Bialik', 'Kiryat Motzkin', 'Rosh HaAyin', 'Nahariya', 'Or Yehuda', 'Yavne', 'Ramat HaSharon', 'Maale Adumim', 'Dimona', 'Migdal HaEmek', 'Arad', 'Ofakim', 'Yokneam Illit', 'Kiryat Yam', 'Qalansawe', 'Kiryat Malakhi', 'Gaza', 'Ramallah', 'Hebron', 'Nablus', 'Bethlehem', 'Jenin', 'Jericho', 'Khan Yunis', 'Rafah'],
    background: '#334866',
    soundFile: 'sounds/israel-notification-alert.mp3'
  },
  'MENA': {
    keywords: ['Lebanon', 'Syria', 'Iraq', 'Iran', 'Islamic Resistance', 'Houthi', 'Yemen', 'Saudi Arabia', 'UAE', 'United Arab Emirates', 'Turkey', 'Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank', 'Jordan', 'IRGC', 'Hezbollah', 'Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Aleppo', 'Damascus', 'Homs', 'Latakia', 'Beirut', 'Amman', 'Baghdad', 'Basra', 'Mosul', 'Erbil', 'Kuwait City', 'Manama', 'Doha', 'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Muscat', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Tehran', 'Mashhad', 'Isfahan', 'Karaj', 'Tabriz', 'Shiraz', 'Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'Asyut', 'Fes', 'Casablanca', 'Rabat', 'Marrakesh', 'Tangier', 'Agadir', 'Tunis', 'Sfax', 'Sousse', 'Tripoli', 'Benghazi', 'Misrata', 'Algiers', 'Oran', 'Constantine', 'Annaba'],
    background: '#5d4d36',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
  'China & APAC Tensions': {
    keywords: ['South China Sea', 'SCS', 'Nine-Dash Line', 'Spratly Islands', 'Paracel Islands', 'Scarborough Shoal', 'ASEAN', 'Philippines and South China Sea', 'Vietnam and South China Sea', 'Malaysia and South China Sea', 'Brunei and South China Sea', 'Chinas artificial islands', 'US-China relations', 'Sino-American relations', 'Taiwan', 'Taipei'],
    background: '#633d30',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
  'North Korea': {
    keywords: ['North Korea', 'DPRK', 'Pyongyang', 'Kim Jong-un', 'North Korean government', 'North Korean military', 'North Korean regime', 'North Korean sanctions', 'North Korean economy', 'North Korean diplomacy', 'North Korean missile test', 'North Korean missile launch', 'North Korean missile test', 'North Korean missile launch', 'South Korea', 'ROK', 'Seoul', 'South Korean government', 'South Korean military', 'Moon Jae-in', 'Yoon Suk-yeol', 'Kaesong Industrial Complex', 'Cheonan sinking', 'Yeonpyeong Island shelling', 'North Korean artillery fire', 'North Korean missile tests', 'North Korean nuclear tests', 'North Korean espionage', 'South Korean sanctions', 'South Korean defense strategy', 'North Korean provocations', 'North Korean threats', 'Pyongyang', 'Hamhung', 'Chongjin', 'Nampo', 'Wonsan', 'Sinuiju', 'Tanchon', 'Kaesong', 'Sariwon', 'Haeju', 'Kimchaek', 'Hyesan', 'Songnim', 'Rason', 'Kanggye', 'Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Seongnam', 'Goyang', 'Yongin', 'Bucheon', 'Cheongju', 'Jeonju', 'Cheonan', 'Ansan', 'Sejong', 'Anyang', 'Uijeongbu', 'Gimhae', 'Pyeongtaek', 'Jinju', 'Pohang', 'Mokpo', 'Jeju', 'Gwangmyeong'],
    background: '#503030',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
};

document.addEventListener('DOMContentLoaded', async () => {
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
  const timezoneSelector = document.getElementById('timezoneSelector'); // Timezone selector
  let feedItems = [];
  let latestFeedDate = new Date(0);
  let pingVolume = 0.5;
  const statusItems = new Map();
  let currentTimezoneOffset = 0; // Default to PST/PDT

  console.log("DOM fully loaded and parsed");

  const { format } = dateFns;

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
  
    // Ensure TSV sources are added
    tsvFiles.forEach(({ source }) => {
      if (!uniqueSources.includes(source)) {
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
      }
    });
  }

  toggleSourceFilterButton.addEventListener('click', () => {
    const isHidden = sourceFilterContainer.style.display === 'none';
    sourceFilterContainer.style.display = isHidden ? 'block' : 'none';
    toggleSourceFilterButton.textContent = isHidden ? 'Hide Source Filter' : 'Show Source Filter';
  });

  timezoneSelector.addEventListener('change', () => {
    const selectedTimezone = timezoneSelector.value;
    switch (selectedTimezone) {
      case 'Pacific Time':
        currentTimezoneOffset = 0;
        break;
      case 'Mountain Time':
        currentTimezoneOffset = 1;
        break;
      case 'Central Time':
        currentTimezoneOffset = 2;
        break;
      case 'Eastern Time':
        currentTimezoneOffset = 3;
        break;
    }
    displayFeeds();
  });
  
  const RETRIES = 1;

  const fetchFeed = async (feed, retries = RETRIES) => {
    for (const url of [feed.url, ...(feed.backups || [])]) {
      try {
        const cacheBuster = new Date().getTime();
        const cacheBustedUrl = `${url}${url.includes('?') ? '&' : '?'}cache-bust=${cacheBuster}`;
        
        console.log(`Fetching URL: ${cacheBustedUrl}`);
        const response = await fetch(cacheBustedUrl);
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        const isAtom = xmlDoc.documentElement.nodeName === 'feed';
        const items = isAtom ? xmlDoc.getElementsByTagName('entry') : xmlDoc.getElementsByTagName('item');
        const feedItemsArray = Array.from(items);
        let feedItems = [];
  
        feedItemsArray.forEach(item => {
          const title = item.querySelector('title')?.textContent || 'No title';
          let link = isAtom 
            ? item.querySelector('link[rel="alternate"]')?.getAttribute('href') 
            : item.querySelector('link')?.textContent || item.querySelector('link')?.getAttribute('href') || '#';
          const description = isAtom 
            ? item.querySelector('summary')?.textContent || item.querySelector('content')?.textContent || 'No description' 
            : item.querySelector('description')?.textContent || 'No description';
          const pubDateText = isAtom 
            ? item.querySelector('published')?.textContent 
            : item.querySelector('pubDate')?.textContent;
          const pubDate = pubDateText ? parseDate(pubDateText) : new Date();
          const pacificDate = convertToTimezone(pubDate, feed.source);
  
          // Fallback: Extract link from description HTML if link is still undefined
          if (!link || link === '#') {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = description;
            const anchor = tempDiv.querySelector('a');
            link = anchor ? anchor.href : '#';
          }
  
          if (title && link && description && pacificDate) {
            feedItems.push({
              title,
              link,
              description: decodeHTMLEntities(description),
              pubDate: pacificDate,
              source: feed.source,
              reliability: feed.reliability,
              background: feed.background
            });
          } else {
            console.log('Incomplete item:', { title, link, description, pacificDate });
          }
        });
  
        // Apply filtering based on required and ignore terms
        feedItems = filterFeedItems(feedItems, feed.requiredTerms, feed.ignoreTerms);
  
        updateStatus(feed.source, feed.url, true);
        console.log(`Fetched ${feedItems.length} items from ${feed.source}`);
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

  const tsvFiles = [
    { file: 'Venezuela_News_Network.tsv', source: 'Venezuela News Network', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'Israel_Security_Cabinet_News.tsv', source: 'Israel Security Cabinet News', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'Stand_With_Us_Breaking_News.tsv', source: 'Stand With Us Breaking News', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'Ukraine_Air_Defense.tsv', source: 'Ukraine Air Defense', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'WOLPalestine.tsv', source: 'WOLPalestine', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'USGS_Earthquakes.tsv', source: 'USGS Earthquakes', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'Jewish_Breaking_News.tsv', source: 'Jewish Breaking News', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'Mannies_War_Room.tsv', source: 'Mannies War Room - Times of Israel', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'Ukraine_Air_Defense.tsv', source: 'Ukraine Air Defense', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'PoliticsGR.tsv', source: 'PoliticsGR', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'RerumNovarumIntel.tsv', source: 'Rerum Novarum Intel', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'IDFOfficial.tsv', source: 'Israel Defense Forces', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'OurWarsToday.tsv', source: 'Our Wars, Today', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'Rybar.tsv', source: 'Rybar - Russian News', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'IranInternational.tsv', source: 'Irn Intl', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'dtek_ua.tsv', source: 'DTEK Ukraine', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'astrapress.tsv', source: 'Astra', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'ArmyInformUA.tsv', source: 'Army Inform UA', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: '38north.tsv', source: '38 North', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'NKNews.tsv', source: 'NK News', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'EastAsiaForum.tsv', source: 'East Asia Forum', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'ROCMOFA.tsv', source: 'ROC Ministry of Defense', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'TaiwanToday.tsv', source: 'Taiwan Today', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'AsiaNews.tsv', source: 'Asia News', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'HongKongFreePress.tsv', source: 'Hong Kong Free Press', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'PeoplesDaily.tsv', source: 'The Peoples Daily Edition - PRC State Media & Propaganda', reliability: 'Requires Verification', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'TheDiplomat.tsv', source: 'The Diplomat', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'Haartz.tsv', source: 'Haartz', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'AlJazeera.tsv', source: 'Al Jazeera', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'TheGuardian.tsv', source: 'The Guardian', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'TASSAgency.tsv', source: 'TASS Agency - RU State Media', reliability: 'Requires Verification', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'IranWire.tsv', source: 'Iran Wire', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'ArabNews.tsv', source: 'Arab News', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'NewArab.tsv', source: 'New Arab', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'SputnikGlobe.tsv', source: 'Sputnik Globe - RU State Media', reliability: 'Requires Verification', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'AnadoluAjansi.tsv', source: 'Anadolu Ajansi - Turkey State Media', reliability: 'Requires Verification', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'FirstPostNews.tsv', source: 'First Post News', reliability: 'Dubious', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'VOANews.tsv', source: 'VOA News', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'NoelReports.tsv', source: 'Noel Reports', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'KyivIndependent.tsv', source: 'Kyiv Independent', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] },
    { file: 'ArmyRecognition.tsv', source: 'Army Recognition', reliability: 'Credible', background: '#493a53', requiredTerms: [], ignoreTerms: [] }
  ];

  async function fetchTSVFile(url) {
    try {
      const response = await fetch(url);
      const tsvText = await response.text();
      return tsvText;
    } catch (error) {
      console.error('Error fetching TSV file:', error);
      return null;
    }
  }

  function parseTSV(tsvText, source, reliability, background, requiredTerms, ignoreTerms) {
    const parsedData = Papa.parse(tsvText, {
      delimiter: '\t',
      header: true,
      skipEmptyLines: true
    });
  
    if (parsedData.errors.length) {
      console.error("Errors parsing TSV:", parsedData.errors);
      return [];
    }
  
    const items = parsedData.data;
  
    return items.map((item, index) => {
      const title = item.Title?.trim() || 'No title';
      const link = item.Link?.trim() || '#';
      const description = decodeHTMLEntities(item.Description?.trim() || 'No description');
      const pubDate = parseDate(item.pubDate?.trim());
      const locationLink = item.Location?.trim();
      const magnitude = parseFloat(item.Magnitude?.trim());
  
      if (!pubDate) {
        console.warn(`Skipping row ${index + 2} due to invalid date: ${JSON.stringify(item)}`);
        return null; // Skip rows with invalid dates
      }
  
      let magnitudeImage = '';
      if (magnitude >= 8.0) {
        magnitudeImage = 'icons/EarthquakeExtreme.png';
      } else if (magnitude >= 7.0) {
        magnitudeImage = 'icons/EarthquakeHigh.png';
      } else if (magnitude >= 6.1) {
        magnitudeImage = 'icons/EarthquakeModerate.png';
      } else if (magnitude >= 5.0) {
        magnitudeImage = 'icons/EarthquakeLow.png';
      }
  
      console.log(`Magnitude: ${magnitude}, Image: ${magnitudeImage}`);
  
      let locationImage = '';
      if (locationLink) {
        locationImage = `<a href="${locationLink}" target="_blank"><img src="${magnitudeImage}" alt="Earthquake Severity" width="50" height="50" style="border:0;" /></a>`;
      }
  
      return {
        title,
        link,
        description: description + locationImage, // Append the earthquake image to the description
        pubDate: convertToTimezone(pubDate, source),
        source,
        reliability,
        background,
        requiredTerms,
        ignoreTerms
      };
    }).filter(item => item); // Filter out null values
  }

  async function fetchTSVFiles() {
    let tsvFeedItems = [];
    let newFeedItems = false; // Flag to check if there are new items
  
    for (const { file, source, reliability, background, requiredTerms, ignoreTerms } of tsvFiles) {
      try {
        const cacheBuster = new Date().getTime();
        const tsvText = await fetchTSVFile(`GoogleSheets/${file}?cb=${cacheBuster}`);
        console.log(`Fetched TSV: ${file}`);
        console.log(tsvText); // Log fetched TSV text for debugging
        const parsedTSV = parseTSV(tsvText, source, reliability, background, requiredTerms, ignoreTerms);
        console.log(parsedTSV); // Log parsed TSV data for debugging
  
        if (parsedTSV.length > 0) {
          // Check if any new items are newer than the latest feed date
          const maxPubDate = new Date(Math.max(...parsedTSV.map(item => item.pubDate)));
          if (maxPubDate > latestFeedDate) {
            newFeedItems = true;
            latestFeedDate = maxPubDate; // Update the latest feed date
          }
        }
  
        tsvFeedItems = tsvFeedItems.concat(parsedTSV);
      } catch (error) {
        console.error(`Error fetching TSV file ${file}:`, error);
      }
    }
  
    if (newFeedItems) {
      playSound('sounds/news-alert-notification.mp3'); // Play the sound if there are new items
    }
  
    return tsvFeedItems;
  }

  function filterFeedItems(items, requiredTerms, ignoreTerms) {
    return items.filter(item => {
      const content = `${item.title} ${item.description}`.toLowerCase();

      // If requiredTerms is not empty, ensure at least one required term is found
      if (requiredTerms.length > 0 && !requiredTerms.some(term => content.includes(term.toLowerCase()))) {
        return false;
      }

      // If ignoreTerms is not empty, ensure no ignore term is found
      if (ignoreTerms.length > 0 && ignoreTerms.some(term => content.includes(term.toLowerCase()))) {
        return false;
      }

      return true;
    });
  }

  function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

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
      console.error(`Invalid date value: ${dateString}`);
      return null; // Return null for invalid dates
    }
    return parsedDate;
  }

  function convertToTimezone(date, source) {
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
      adjustedDate.setHours(adjustedDate.getHours() - 0.5);
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
    } else if (source === 'World News Era') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'South China Morning Post') {
      adjustedDate.setHours(adjustedDate.getHours() - 15);
    } else if (source === 'South China Morning Post') {
      adjustedDate.setHours(adjustedDate.getHours() - 9);
    } else if (source === 'The Federalist') {
      adjustedDate.setHours(adjustedDate.getHours() - 7);
    } else if (source === 'Breaking News Subreddit') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Yemeni Crisis Subreddit') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'World News Subreddit') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'International News Subreddit') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Naharnet - Lebanon') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Naharnet - Middle East') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'National Weather Service') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Saba Agency Telegram') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Epoch Times Telegram') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Global Shake Princeton') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'Euro News') {
      adjustedDate.setHours(adjustedDate.getHours() - 0);
    } else if (source === 'TSV Israel Security Cabinet News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0); // Adjust according to specific source timezone if needed
    } else if (source === 'TSV Stand With Us Breaking News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'TSV Ukraine Air Defense') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'TSV WOLPalestine') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Hong Kong Observatory - Earthquake') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Hong Kong Observatory - Weather Warning') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Meteorological Service Singapore') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Brazil Weather Alerts') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Australia Bureau of Meteorology - Tasmania') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Australia Bureau of Meteorology - News South Wales and ACT') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Australia Bureau of Meteorology - Victoria') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Australia Bureau of Meteorology - Queensland') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Australia Bureau of Meteorology - West Australia') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Australia Bureau of Meteorology - South Australia') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Australia Bureau of Meteorology - Northern Territory') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Venezuela News Network') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'USGS Earthquakes') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Jewish Breaking News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Mannies War Room - Times of Israel') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Ukraine Air Defense') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'PoliticsGR') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Rerum Novarum Intel') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Israel Defense Forces') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Our Wars, Today') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Rybar - Russian News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Irn Intl') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'DTEK Ukraine') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Army Inform UA') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Astra') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === '38 North') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'NK News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'East Asia Forum') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'ROC Ministry of Defense') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Taiwan Today') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Asia News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Hong Kong Free Press') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'The Peoples Daily Edition - China State News & Propaganda') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'The Diplomat') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Haartz') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Al Jazeera') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'TASS Agency - RU State Media') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Iran Wire') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Arab News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'New Arab') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Sputnik Globe - RU State Media') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Anadolu Ajansi - Turkey State Media') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'First Post News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'VOA News') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Noel Reports') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Kyib Independent') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else if (source === 'Army Recognition') {
      adjustedDate.setHours(adjustedDate.getHours() + 0);
    } else {
      console.warn(`No specific time adjustment found for source: ${source}`);
    }

    adjustedDate.setHours(adjustedDate.getHours() + currentTimezoneOffset);
    return adjustedDate;
  }

  function removeDuplicateTitles(items) {
    const uniqueItems = new Map();
    items.forEach(item => {
      if (!uniqueItems.has(item.title) || uniqueItems.get(item.title).pubDate < item.pubDate) {
        uniqueItems.set(item.title, item);
      }
    });
    return Array.from(uniqueItems.values());
  }

  async function fetchFeedsSequentially() {
    const interval = 3000; // 3 seconds interval
  
    const priorityIntervals = {
      'Very High': 30000, // 30 seconds
      'High': 60000, // 1 minute
      'Medium': 180000, // 3 minutes
      'Low': 300000, // 5 minutes
      'Very Low': 600000 // 10 minutes
    };
  
    // Fetch TSV files first
    const tsvFeedItems = await fetchTSVFiles();
    console.log(`TSV Feed Items: ${JSON.stringify(tsvFeedItems, null, 2)}`); // Debugging statement
    feedItems = [...feedItems, ...tsvFeedItems];
    
    // Fetch RSS feeds after TSV feeds
    await Promise.all(rssFeeds.map(feed => fetchFeedAndUpdate(feed)));
  
    // Sort by date, newest first
    feedItems.sort((a, b) => b.pubDate - a.pubDate);
    displayFeeds();
  
    // Schedule periodic fetching of RSS feeds
    rssFeeds.forEach((feed) => {
      const fetchInterval = priorityIntervals[feed.priorityLevel] || 180000; // Default to 3 minutes if not specified
      console.log(`Scheduling fetch for ${feed.source} with interval of ${fetchInterval} ms`);
  
      setInterval(() => {
        console.log(`Periodic fetch for ${feed.source}`);
        fetchFeedAndUpdate(feed);
      }, fetchInterval);
    });
  
    // Fetch TSV files periodically
    setInterval(async () => {
      const tsvFeedItems = await fetchTSVFiles();
      feedItems = [...feedItems.filter(item => !tsvFeedItems.find(tsvItem => tsvItem.title === item.title)), ...tsvFeedItems];
      feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by date, newest first
      console.log('Combined Feed Items:', feedItems); // Log combined feed items for debugging
      displayFeeds();
    }, 60000); // Fetch TSV files every 3 minutes
  }

  async function fetchFeedAndUpdate(feed) {
    console.log(`Fetching feed from ${feed.source}`);
    const data = await fetchFeed(feed);
    if (data.length === 0) {
      console.log(`No items found in feed from ${feed.source}`);
    }
    feedItems = [...feedItems.filter(item => item.source !== feed.source), ...data];
    feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by date, newest first

    if (data.length > 0 && data[0].pubDate > latestFeedDate) {
      latestFeedDate = data[0].pubDate;
      applyTopicStyling(data[0]);
    }

    displayFeeds();
  }

  function applyTopicStyling(item) {
    console.log("Applying topic styling for item:", item.title);
    console.log(`Current latestFeedDate: ${latestFeedDate}`);
    console.log(`Item publication date: ${item.pubDate}`);
  
    let isNewItem = false;
    let selectedSoundFile = 'sounds/news-alert-notification.mp3'; // Default sound
  
    for (const topic in topicKeywords) {
      if (topicKeywords.hasOwnProperty(topic)) {
        const { keywords, background, soundFile } = topicKeywords[topic];
        if (keywords.some(keyword => item.description.toLowerCase().includes(keyword.toLowerCase()) ||
                                      item.title.toLowerCase().includes(keyword.toLowerCase()))) {
          console.log(`Matched topic: ${topic} for item: ${item.title}`);
          
          item.background = background;
          selectedSoundFile = soundFile; // Set the sound file to the one for the matched topic
          
          // The condition now only checks if the item date is strictly greater.
          if (item.pubDate > latestFeedDate) {
            console.log(`New item detected. Previous latestFeedDate: ${latestFeedDate}, New item date: ${item.pubDate}`);
            isNewItem = true;
            latestFeedDate = item.pubDate; // Update after processing
            console.log(`Updated latestFeedDate: ${latestFeedDate}`);
            playSound(selectedSoundFile, item.title); // Play the topic-specific sound and pass the item title for logging
          } else {
            console.log('Item is not newer than latestFeedDate, no sound will be played.');
          }
          break; // Stop checking after the first match
        }
      }
    }
  
    console.log(`Sound selected for item: ${item.title} is ${selectedSoundFile}`);
    if (!isNewItem) {
      item.background = item.background || '#203050'; // Default background color from rssFeeds
    }
  }
  
  function playSound(soundFile, itemTitle) {
    console.log(`Attempting to play sound file: ${soundFile} for item: ${itemTitle}`);
    const audio = new Audio(soundFile);
    audio.volume = pingVolume;
    audio.play().then(() => {
      console.log(`Sound file ${soundFile} played successfully for item: ${itemTitle}.`);
    }).catch(error => {
      console.error('Error playing sound:', error);
    });
  }

  function displayFeeds() {
      console.log("Displaying feeds...");
  
      feedsContainer.innerHTML = '';
      feedItems = removeDuplicateTitles(feedItems);
  
      const now = new Date();
      const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
  
      const filteredFeeds = applyFilter();
      console.log(`Filtered feeds count: ${filteredFeeds.length}`);
  
      const searchTerm = searchInput.value.trim().toLowerCase();
      const searchTerms = parseSearchTerm(searchTerm);
  
      const recentFeeds = filteredFeeds.filter(item => item.pubDate > oneYearAgo);
      console.log(`Recent feeds count: ${recentFeeds.length}`);
  
      const searchFilteredFeeds = recentFeeds.filter(item =>
          searchTerms.every(termGroup =>
              termGroup.some(term =>
                  item.title.toLowerCase().includes(term) ||
                  item.description.toLowerCase().includes(term) ||
                  item.source.toLowerCase().includes(term)
              )
          )
      );
      console.log(`Search filtered feeds count: ${searchFilteredFeeds.length}`);
      console.log(`Search filtered feeds: ${JSON.stringify(searchFilteredFeeds, null, 2)}`);
  
      const fragment = document.createDocumentFragment();
      searchFilteredFeeds.forEach(item => {
          applyTopicStyling(item); // Apply styling and sound logic for each item
  
          const feedItem = document.createElement('div');
          feedItem.classList.add('feed-item');
          feedItem.style.backgroundColor = item.background;
  
          const credibilityContainer = document.createElement('div');
          credibilityContainer.classList.add('credibility-container');
  
          if (item.reliability === 'Credible') {
              credibilityContainer.classList.add('credible', 'bg-credible');
          } else if (item.reliability === 'Dubious') {
              credibilityContainer.classList.add('dubious', 'bg-dubious');
          } else if (item.reliability === 'Requires Verification') {
              credibilityContainer.classList.add('requires-verification', 'bg-requires-verification');
          }
  
          const feedContent = document.createElement('div');
          feedContent.classList.add('feed-content');
  
          const parser = new DOMParser();
          const doc = parser.parseFromString(item.description, 'text/html');
          const firstImg = doc.querySelector('img');
  
          // Remove all images from the description
          doc.querySelectorAll('img').forEach(img => img.remove());
          const cleanedDescription = doc.body.innerHTML;
  
          // Truncate long descriptions
          const maxLength = 500;
          let truncatedDescription = cleanedDescription;
          let showMoreLink = '';
          if (cleanedDescription.length > maxLength) {
              truncatedDescription = cleanedDescription.substring(0, maxLength) + '...';
              showMoreLink = `<a href="#" class="see-more" data-full-description="${encodeURIComponent(cleanedDescription)}">See More</a>`;
          }
  
          // Add the first image back to the feedElement if it exists
          let imageHtml = '';
          if (firstImg) {
              if (item.source === 'TSV USGS Earthquakes') {
                  imageHtml = `<img src="${firstImg.src}" alt="Earthquake Severity" width="50" height="50" style="border:0;" />`;
              } else {
                  imageHtml = `<img src="${firstImg.src}" alt="Feed image" height="300" onerror="this.onerror=null;this.src='https://i.imgur.com/GQPN5Q9.jpeg';" />`;
              }
          }
  
          // Corrected to use truncated description and showMoreLink
          feedContent.innerHTML = 
              `<h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
              ${imageHtml}
              <div>${truncatedDescription} ${showMoreLink}</div>
              <p><small>Published on: ${format(item.pubDate, 'PPpp')} (${timezoneSelector.value})</small></p>
              <p><strong>Source:</strong> ${item.source}</p>`;
  
          feedItem.appendChild(credibilityContainer);
          feedItem.appendChild(feedContent);
          fragment.appendChild(feedItem);
      });
  
      feedsContainer.appendChild(fragment);
      console.log("Feeds displayed.");
  
      // Add event listeners for "See More" links
      document.querySelectorAll('.see-more').forEach(link => {
          link.addEventListener('click', function(event) {
              event.preventDefault();
              const fullDescription = decodeURIComponent(this.getAttribute('data-full-description'));
              this.parentNode.innerHTML = fullDescription;
          });
      });
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
    console.log(`Total feed items: ${feedItems.length}`);

    const timelineValue = timelineFilter.value;
    console.log(`Timeline filter value: ${timelineValue}`);

    if (timelineValue === 'lastHour') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 3600000);
    } else if (timelineValue === 'last12Hours') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 43200000);
    } else if (timelineValue === 'lastDay') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 86400000);
    }
    console.log(`Filtered feeds after timeline filter: ${filteredFeeds.length}`);

    const topicValue = topicFilter.value;
    console.log(`Topic filter value: ${topicValue}`);

    if (topicValue !== 'all' && topicKeywords[topicValue]) {
      const keywords = topicKeywords[topicValue].keywords.map(keyword => keyword.toLowerCase());
      filteredFeeds = filteredFeeds.filter(item =>
        keywords.some(keyword => item.description.toLowerCase().includes(keyword))
      );
    }
    console.log(`Filtered feeds after topic filter: ${filteredFeeds.length}`);

    const checkedSources = Array.from(document.querySelectorAll('input[name="sourceFilter"]:checked')).map(cb => cb.value);
    console.log(`Checked sources: ${checkedSources.join(', ')}`);

    if (checkedSources.length > 0 && !checkedSources.includes('all')) {
      filteredFeeds = filteredFeeds.filter(item => checkedSources.includes(item.source));
    }
    console.log(`Filtered feeds after source filter: ${filteredFeeds.length}`);

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

  volumeSlider.value = pingVolume;

  populateSourceFilter();
  fetchFeedsSequentially();
});
