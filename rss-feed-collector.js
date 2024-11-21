import rssFeeds from './rssFeeds.js';

const topicKeywords = {
  'Russia': {
    keywords: ['Russia', 'Ukraine', 'Belarus', 'Donbas', 'Crimea', 'Kyiv', 'Kharkiv', 'Odesa', 'Dnipro', 'Donetsk', 'Zaporizhzhia', 'Lviv', 'Kryvyi Rih', 'Mykolaiv', 'Mariupol', 'Luhansk', 'Vinnytsia', 'Simferopol', 'Kherson', 'Poltava', 'Chernihiv', 'Cherkasy', 'Sumy', 'Zhytomyr', 'Khmelnytskyi', 'Chernivtsi', 'Rivne', 'Ivano-Frankivsk', 'Ternopil', 'Kropyvnytskyi', 'Lutsk', 'Uzhhorod', 'Moscow', 'Saint Petersburg', 'Nizhny Novgorod', 'Kazan', 'Voronezh', 'Saratov', 'Krasnodar', 'Tolyatti', 'Izhevsk', 'Ulyanovsk', 'Yaroslavl', 'Tyumen', 'Barnaul', 'Vladivostok', 'Irkutsk', 'Khabarovsk', 'Kurgan', 'Kaliningrad', 'Belgorod', 'Ivanovo', 'Kostroma', 'Kursk', 'Lipetsk', 'Orel', 'Ryazan', 'Smolensk', 'Tula', 'Tver', 'Vladimir', 'Bryansk', 'Pskov', 'Novgorod', 'Kaluga', 'Tambov', 'רוסיה', 'אוקראינה', 'בלארוס', 'דונבס', 'קרים', 'קייב', 'חרקוב', 'אודסה', 'דניפרו', 'דונייצק', 'זפוריזיה', 'לבוב', 'روسيا', 'أوكرانيا', 'بيلاروسيا', 'دونباس', 'القرم', 'كييف', 'خاركيف', 'أوديسا', 'دنيبرو', 'دونيتسك', 'زابوروجيا', 'لفيف', 'Росія', 'Україна', 'Білорусь', 'Донбас', 'Крим', 'Київ', 'Харків', 'Одеса', 'Дніпро', 'Донецьк', 'Запоріжжя', 'Львів', 'Россия', 'Украина', 'Беларусь', 'Донбасс', 'Крым', 'Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов', 'Rusia', 'Ucrania', 'Bielorrusia', 'Donbás', 'Crimea', 'Kiev', 'Járkov', 'Odesa', 'Dnipro', 'Donetsk', 'Zaporiyia', 'Leópolis', '러시아', '우크라이나', '벨라루스', '돈바스', '크림', '키이우', '하르키우', '오데사', '드니프로', '도네츠크', '자포리자', '리비우' ],
    background: '#205028',
    soundFile: 'sounds/ukraine-notification-alert.mp3'
  },
  'Israel': {
    keywords: ['Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank', 'Jerusalem', 'Tel Aviv', 'Haifa', 'Rishon LeZion', 'Petah Tikva', 'Ashdod', 'Netanya', 'Beer Sheva', 'Bnei Brak', 'Holon', 'Ramat Gan', 'Ashkelon', 'Rehovot', 'Bat Yam', 'Kfar Saba', 'Herzliya', 'Modiin-Maccabim-Reut', 'Raanana', 'Beit Shemesh', 'Kiryat Ata', 'Lod', 'Nazareth', 'Ramla', 'Hadera', 'Betar Illit', 'Tiberias', 'Eilat', 'Acre', 'Hod Hasharon', 'Givatayim', 'Umm al-Fahm', 'Tayibe', 'Sakhnin', 'Karmiel', 'Tira', 'Sderot', 'Kiryat Gat', 'Kiryat Bialik', 'Kiryat Motzkin', 'Rosh HaAyin', 'Nahariya', 'Or Yehuda', 'Yavne', 'Ramat HaSharon', 'Maale Adumim', 'Dimona', 'Migdal HaEmek', 'Arad', 'Ofakim', 'Yokneam Illit', 'Kiryat Yam', 'Qalansawe', 'Kiryat Malakhi', 'Gaza', 'Ramallah', 'Hebron', 'Nablus', 'Bethlehem', 'Jenin', 'Jericho', 'Khan Yunis', 'Rafah', '이스라엘', '하마스', '팔레스타인', '팔레스타인 당국', '가자', '서안 지구', '예루살렘', '텔아비브', '하이파', 'Израиль', 'ХАМАС', 'Палестина', 'Палестинская автономия', 'Газа', 'Западный берег', 'Иерусалим', 'Тель-Авив', 'Хайфа', 'Ізраїль', 'Хамас', 'Палестина', 'Палестинська влада', 'Газа', 'Західний берег', 'Єрусалим', 'Тель-Авів', 'Хайфа', 'إسرائيل', 'حماس', 'فلسطين', 'السلطة الفلسطينية', 'ישראל', 'חמאס', 'פלסטין', 'הרשות הפלסטינית'],
    background: '#166e84',
    soundFile: 'sounds/israel-notification-alert.mp3'
  },
  'Hezbollah': {
    keywords: [
      // Original Keywords
      'Hezbollah', 'Hizbullah', 'Lebanon', 'Lebanese', 'Beirut', 'Southern Lebanon', 'Northern Israel', 
      'Tyre', 'Sidon', 'Bekaa Valley', 'Shebaa Farms', 'Israel-Lebanon border', 'Blue Line', 'Golan Heights', 
      'Metula', 'Kiryat Shmona', 'Nahariya', 'Galilee', 'Upper Galilee', 'Haifa', 
      'Hassan Nasrallah', 'Imad Mughniyeh', 'Naim Qassem', 'Mustafa Badreddine', 'Mohammad Raad', 
      'Mohammed Fneish', 'Ibrahim Amin al-Sayyid', 'Talal Hamiyah', 'Islamic Resistance', 'Hezbollah brigades', 
      'Al-Manar', 'Radwan Force', 'Katyusha rockets', 'Quneitra', 'Dahiya doctrine',
      
      // Additional Cities/Towns/Regions
      'Tripoli', 'Zahle', 'Baalbek', 'Hermel', 'Ras Baalbek', 'Arsal', 'Brital', 'Majdal Anjar', 'Bodai', 
      'Maroun al-Ras', 'Bint Jbeil', 'Qana', 'Nabatieh', 'Khiam', 'Aitaroun', 'Rmeish', 'Yaroun', 'Ain Ebel', 
      'Hasbaya', 'Jezzine', 'Ibl al-Saqi', 'Qlayaa', 'Tebnine', 'Kfar Kila', 'Srifa', 'Deir Mimas', 'Markaba', 
      'Yater', 'Jounieh', 'Bikfaya', 'Broummana', 'Chouf', 'Baabda', 'Aley', 'Akkar', 'Minieh-Danniyeh', 
      'Zgharta', 'Batroun', 'Shebaa Farms', 'Rmeileh', 'Mays al-Jabal', 'Dahiyeh', 'חיזבאללה', 'לבנון', 'ביירות', 'حزب الله', 'لبنان', 'بيروت', 'Хезболла', 'Ліван', 'Бейрут', 'Хезболла', 'Ливан', 'Бейрут', 'Hezbolá', 'Líbano', 'Beirut', '헤즈볼라', '레바논', '베이루트'
    ],
    background: '#6e4334',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
  'MENA': {
    keywords: ['Syria', 'Iraq', 'Iran', 'Islamic Resistance', 'Houthi', 'Yemen', 'Saudi Arabia', 'UAE', 'United Arab Emirates', 'Turkey', 'Israel', 'Hamas', 'Palestine', 'Palestinian Authority', 'Gaza', 'West Bank', 'Jordan', 'IRGC', 'Hezbollah', 'Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Adana', 'Gaziantep', 'Konya', 'Antalya', 'Aleppo', 'Damascus', 'Homs', 'Latakia', 'Beirut', 'Amman', 'Baghdad', 'Basra', 'Mosul', 'Erbil', 'Kuwait City', 'Manama', 'Doha', 'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Muscat', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Tehran', 'Mashhad', 'Isfahan', 'Karaj', 'Tabriz', 'Shiraz', 'Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'Asyut', 'Fes', 'Casablanca', 'Rabat', 'Marrakesh', 'Tangier', 'Agadir', 'Tunis', 'Sfax', 'Sousse', 'Tripoli', 'Benghazi', 'Misrata', 'Algiers', 'Oran', 'Constantine', 'Annaba', 'סוריה', 'עיראק', 'איראן', 'ההתנגדות האיסלאמית', 'חוטי', 'תימן', 'ערב הסעודית', 'איחוד האמירויות', 'איחוד האמירויות הערביות', 'טורקיה','سوريا', 'العراق', 'إيران', 'المقاومة الإسلامية', 'الحوثي', 'اليمن', 'السعودية', 'الإمارات', 'الإمارات العربية المتحدة', 'تركيا', 'Сирія', 'Ірак', 'Іран', 'Ісламський Опір', 'Хусити', 'Ємен', 'Саудівська Аравія', 'ОАЕ', 'Об’єднані Арабські Емірати', 'Туреччина', 'Сирия', 'Ирак', 'Иран', 'Исламское Сопротивление', 'Хуситы', 'Йемен', 'Саудовская Аравия', 'ОАЭ', 'Объединённые Арабские Эмираты', 'Турция', 'Siria', 'Irak', 'Irán', 'Resistencia Islámica', 'Hutí', 'Yemen', 'Arabia Saudita', 'EAU', 'Emiratos Árabes Unidos', 'Turquía', '시리아', '이라크', '이란', '이슬람 저항군', '후티', '예멘', '사우디아라비아', '아랍에미리트', '아랍에미리트연합', '터키' ],
    background: '#6e4334',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
  'China & APAC Tensions': {
    keywords: [
      // Original Keywords
      'South China Sea', 'Chinese', 'China', 'SCS', 'Nine-Dash Line', 'Spratly Islands', 'Paracel Islands', 
      'Scarborough Shoal', 'ASEAN', 'Philippines and South China Sea', 'Vietnam and South China Sea', 
      'Malaysia and South China Sea', 'Brunei and South China Sea', 'Chinas artificial islands', 
      'US-China relations', 'Sino-American relations', 'Taiwan', 'Taipei',
      'East China Sea', 'Diaoyu Islands', 'Senkaku Islands', 'Belt and Road Initiative', 'BRI', 'Indo-Pacific', 'Quad', 'QUAD alliance', 'US Indo-Pacific Command', 'Beijing', 'Xi Jinping', 'PLA', 'People’s Liberation Army', 'Chinese Communist Party', 'CCP', 'Hong Kong protests', 'Uyghurs', 'Xinjiang', 'Tibet', 'East China Sea', 'Huawei', 'PLA Navy', 'PLAN', 'Taiwanese', 'Chinese fighter jets', 'Hong Kong', 'One Country Two Systems', 'Asia-Pacific tensions', 'ים סין הדרומי', 'סיני', 'סין', 'אסיאן', 'טאיוואן', 'טייפה', 'بحر الصين الجنوبي', 'صيني', 'الصين', 'آسيان', 'تايوان', 'تايبيه', 'Південнокитайське море', 'Китайська', 'Китай', 'АСЕАН', 'Тайвань', 'Тайбей', 'Южно-Китайское море', 'Китайский', 'Китай', 'АСЕАН', 'Тайвань', 'Тайбэй', 'Mar del Sur de China', 'Chino', 'China', 'ASEAN', 'Taiwán', 'Taipéi', '남중국해', '중국의', '중국', '아세안', '대만', '타이베이'
    ],
    background: '#632238',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
  'North Korea': {
    keywords: ['צפון קוריאה', 'הרפובליקה הדמוקרטית העממית של קוריאה', 'פיונגיאנג', 'קים ג׳ונג-און', 'كوريا الشمالية', 'جمهورية كوريا الشعبية الديمقراطية', 'بيونغ يانغ', 'كيم جونغ أون', 'Північна Корея', 'КНДР', 'Пхеньян', 'Кім Чен Ин', 'Северная Корея', 'КНДР', 'Пхеньян', 'Ким Чен Ын', 'Corea del Norte', 'RPDC', 'Pionyang', 'Kim Jong-un', '북한', '조선민주주의인민공화국', '평양', '김정은', 'North Korea', 'DPRK', 'Pyongyang', 'Kim Jong-un', 'North Korean government', 'North Korean military', 'North Korean regime', 'North Korean sanctions', 'North Korean economy', 'North Korean diplomacy', 'North Korean missile test', 'North Korean missile launch', 'North Korean missile test', 'North Korean missile launch', 'South Korea', 'ROK', 'Seoul', 'South Korean government', 'South Korean military', 'Moon Jae-in', 'Yoon Suk-yeol', 'Kaesong Industrial Complex', 'Cheonan sinking', 'Yeonpyeong Island shelling', 'North Korean artillery fire', 'North Korean missile tests', 'North Korean nuclear tests', 'North Korean espionage', 'South Korean sanctions', 'South Korean defense strategy', 'North Korean provocations', 'North Korean threats', 'Pyongyang', 'Hamhung', 'Chongjin', 'Nampo', 'Wonsan', 'Sinuiju', 'Tanchon', 'Kaesong', 'Sariwon', 'Haeju', 'Kimchaek', 'Hyesan', 'Songnim', 'Rason', 'Kanggye', 'Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Changwon', 'Seongnam', 'Goyang', 'Yongin', 'Bucheon', 'Cheongju', 'Jeonju', 'Cheonan', 'Ansan', 'Sejong', 'Anyang', 'Uijeongbu', 'Gimhae', 'Pyeongtaek', 'Jinju', 'Pohang', 'Mokpo', 'Jeju', 'Gwangmyeong'],
    background: '#502020',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
  'Weather': {
    keywords: ['weather', 'flood', 'climate', 'environment', 'storm', 'tornado', 'hurricane', 'heatwave', 'earthquake', 'tsunami', 'typhoon', 'blizzard', 'drought', 'cold wave', 'snowstorm', 'cyclone', 'thunderstorm', 'lightning', 'wildfire', 'avalanche', 'mudslide', 'hailstorm', 'gale', 'waterspout', 'microburst', 'heat index', 'wind chill', 'rainstorm', 'monsoon', 'dust storm', 'volcano', 'landslide', 'מזג אוויר', 'שיטפון', 'סערה', 'טורנדו', 'הוריקן', 'גל חום', 'רעידת אדמה', 'צונאמי', 'טייפון', 'סופת שלג', 'בצורת', 'גל קור', 'סופת שלגים', 'ציקלון', 'סופת רעמים', 'ברק', 'שריפה', 'מפלס שלגים', 'מדרון בוץ', 'ברד', 'צינת רוח', 'סופת גשמים', 'מונסון', 'סופת חול', 'הר געש', 'מדרון תלול', 'طقس', 'فيضان', 'عاصفة', 'إعصار', 'إعصار مداري', 'موجة حر', 'زلزال', 'تسونامي', 'إعصار', 'عاصفة ثلجية', 'جفاف', 'موجة برد', 'عاصفة ثلجية', 'إعصار', 'عاصفة رعدية', 'برق', 'حريق', 'انهيار جليدي', 'انهيار طيني', 'عاصفة برد', 'برودة الرياح', 'عاصفة مطرية', 'رياح موسمية', 'عاصفة رملية', 'بركان', 'انهيار أرضي', 'погода', 'повінь', 'шторм', 'торнадо', 'ураган', 'теплова хвиля', 'землетрус', 'цунамі', 'тайфун', 'снігова буря', 'посуха', 'холодна хвиля', 'снігопад', 'циклон', 'гроза', 'блискавка', 'лісова пожежа', 'лавина', 'зсув', 'град', 'вітер', 'дощовий шторм', 'мусон', 'пилова буря', 'вулкан', 'зсув ґрунту', 'погода', 'наводнение', 'шторм', 'смерч', 'ураган', 'жара', 'землетрясение', 'цунами', 'тайфун', 'буран', 'засуха', 'холодная волна', 'метель', 'циклон', 'гроза', 'молния', 'лесной пожар', 'лавина', 'оползень', 'град', 'холодный ветер', 'ливень', 'муссон', 'пыльная буря', 'вулкан', 'оползень', 'clima', 'inundación', 'tormenta', 'tornado', 'huracán', 'ola de calor', 'terremoto', 'tsunami', 'tifón', 'ventisca', 'sequía', 'ola de frío', 'nevada', 'ciclón', 'tormenta eléctrica', 'rayo', 'incendio forestal', 'avalancha', 'deslizamiento de tierra', 'granizada', 'sensación térmica', 'lluvia torrencial', 'monzón', 'tormenta de polvo', 'volcán', 'desprendimiento de tierra', '날씨', '홍수', '폭풍', '토네이도', '허리케인', '폭염', '지진', '쓰나미', '태풍', '눈보라', '가뭄', '한파', '눈보라', '사이클론', '뇌우', '번개', '산불', '눈사태', '산사태', '우박', '체감 온도', '폭우', '몬순', '황사', '화산', '산사태' ],
    background: '#545f38',
    soundFile: 'sounds/weather-alert-notification.mp3'
  },
  'Protests': {
    keywords: ['protest', 'rally', 'demonstration', 'riot', 'vigil', 'מחאה', 'עצרת', 'הפגנה', 'מהומה', 'משמרת', 'احتجاج', 'تجمع', 'مظاهرة', 'شغب', 'وقفة', 'протест', 'мітинг', 'демонстрація', 'бунт', 'пікет', 'протест', 'митинг', 'демонстрация', 'бунт', 'встреча', 'protesta', 'manifestación', 'demostración', 'disturbio', 'vigilia', '시위', '집회', '데모', '폭동', '간 vigil' ],
    background: '#4a1f7b',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
  'U.S. 2024 Election & Transition': {
    keywords: ['trump', 'vance', 'january 6', 'U.S. election unrest', 'election violence', 'election disruptions', 'election ballot box fires', 'election polling place violence', 'election protest clashes','election security threats', 'election extremist activities', 'election law enforcement response', 'election unrest in [State/City Name]', 'election violence in swing states', 'election disruptions in [State/City Name]', 'election aftermath violence', 'election protest analysis', 'election security assessment', 'election voter concerns about violence', 'election political violence fears', 'election public safety concerns', 'election social media disinformation', 'election online threats', 'election conspiracy theories', 'election National Guard deployment', 'election emergency response', 'election state emergency declarations', 'election voter intimidation', 'election poll worker threats', 'election safety measures'],
    background: '#697d85',
    soundFile: 'sounds/news-alert-notification.mp3'
  },
};

document.addEventListener('DOMContentLoaded', async () => {
  const feedsContainer = document.getElementById('feeds');
  const loadingOverlay = document.getElementById('loading-overlay');
  const timelineFilter = document.getElementById('timelineFilter');
  const sourceFilterContainer = document.getElementById('sourceFilterContainer');
  const toggleSourceFilterButton = document.getElementById('toggleSourceFilter');
  const searchInput = document.getElementById('searchInput');
  const statusContainer = document.getElementById('statusContainer');
  const refreshTimerDisplay = document.getElementById('refresh-timer');
  const volumeSlider = document.getElementById('volumeSlider');
  const timezoneSelector = document.getElementById('timezoneSelector'); // Timezone selector
  const expandedFeedItems = new Set();
  let feedItems = [];
  let latestFeedDate = new Date(0);
  let pingVolume = 0.5;
  const statusItems = new Map();
  let currentTimezoneOffset = 0; // Default to PST/PDT
  let feedsBatchSize = 10; // Number of feeds to display initially
  let currentlyDisplayedFeeds = 0; // Number of feeds currently displayed
  let feedsObserver; // Intersection observer to handle lazy loading
  let searchFilteredFeeds = []; // Global variable to store filtered feeds
  let isFetchingFeeds = false; // Debounce flag
  let isLiveMode = true; // Start in live mode
  const toggleLiveModeButton = document.querySelector('.live-toggle-button'); // Select the button by its class
  const toggleLiveModeText = toggleLiveModeButton.querySelector('span:first-child'); // Select the first span for text
  let hasFetchedOnLiveToggle = false; // Track if `fetchNewFeeds` has been triggered on live mode toggle
  let fetchIntervalID; // Store the interval ID to avoid setting multiple intervals

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
        return feedItems;
      } catch (error) {
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
    { file: 'Venezuela_News_Network.tsv', source: 'Venezuela News Network', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Israel_Security_Cabinet_News.tsv', source: 'Israel Security Cabinet News', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Stand_With_Us_Breaking_News.tsv', source: 'Stand With Us Breaking News', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Ukraine_Air_Defense.tsv', source: 'Ukraine Air Defense', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'WOLPalestine.tsv', source: 'WOLPalestine', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'USGS_Earthquakes.tsv', source: 'USGS Earthquakes', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Jewish_Breaking_News.tsv', source: 'Jewish Breaking News', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'ManniesWarRoom.tsv', source: 'Mannies War Room - Times of Israel', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Ukraine_Air_Defense.tsv', source: 'Ukraine Air Defense', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'PoliticsGR.tsv', source: 'PoliticsGR', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'RerumNovarumIntel.tsv', source: 'Rerum Novarum Intel', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'IDFOfficial.tsv', source: 'Israel Defense Forces', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'OurWarsToday.tsv', source: 'Our Wars, Today', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Rybar.tsv', source: 'Rybar - Russian News', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'IranInternational.tsv', source: 'Irn Intl', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'dtek_ua.tsv', source: 'DTEK Ukraine', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'astrapress.tsv', source: 'Astra', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'ArmyInformUA.tsv', source: 'Army Inform UA', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: '38north.tsv', source: '38 North', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'NKNews.tsv', source: 'NK News', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'EastAsiaForum.tsv', source: 'East Asia Forum', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'ROCMOFA.tsv', source: 'ROC Ministry of Defense', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'TaiwanToday.tsv', source: 'Taiwan Today', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'AsiaNews.tsv', source: 'Asia News', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'HongKongFreePress.tsv', source: 'Hong Kong Free Press', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'PeoplesDaily.tsv', source: 'The Peoples Daily Edition - PRC State Media & Propaganda', reliability: 'Requires Verification', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'TheDiplomat.tsv', source: 'The Diplomat', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Haaretz.tsv', source: 'Haaretz', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'AlJazeera.tsv', source: 'Al Jazeera', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'TheGuardian.tsv', source: 'The Guardian', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'TASSAgency.tsv', source: 'TASS Agency - RU State Media', reliability: 'Requires Verification', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'IranWire.tsv', source: 'Iran Wire', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'ArabNews.tsv', source: 'Arab News', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'NewArab.tsv', source: 'New Arab', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'SputnikGlobe.tsv', source: 'Sputnik Globe - RU State Media', reliability: 'Requires Verification', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'AnadoluAjansi.tsv', source: 'Anadolu Ajansi - Turkey State Media', reliability: 'Requires Verification', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'FirstPostNews.tsv', source: 'First Post News', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'VOANews.tsv', source: 'VOA News', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'noel_reports.tsv', source: 'Noel Reports', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'KyivIndependent.tsv', source: 'Kyiv Independent', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'ArmyRecognition.tsv', source: 'Army Recognition', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'BreakingDefense.tsv', source: 'Breaking Defense', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'AssociatedPress.tsv', source: 'Associated Press', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'WallStreetJournal.tsv', source: 'Wall Street Journal', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'JerusalemPost.tsv', source: 'The Jerusalem Post', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'BBCNews.tsv', source: 'BBC News', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Politico.tsv', source: 'Politico', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'SkyNews.tsv', source: 'Sky News', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Economist.tsv', source: 'The Economist', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Naharnet.tsv', source: 'Naharnet', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'SkyNewsArabia.tsv', source: 'Sky News Arabia', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Algemeiner.tsv', source: 'The Algemeiner', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'DefensePost.tsv', source: 'Defense Post', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'KyivPost.tsv', source: 'Kyiv Post', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'WashingtonPost.tsv', source: 'Washington Post', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'IAEA.tsv', source: 'International Atomic Energy Agency', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'TWZ.tsv', source: 'The War Zone', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'HongKongObservatory.tsv', source: 'Hong Kong Observatory', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'GlobalShakePrinceton.tsv', source: 'Global Shake Princeton', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'NewsNation.tsv', source: 'News Nation Now', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'DefenseOne.tsv', source: 'Defense One', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Aurora.tsv', source: 'Aurora', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'YNet.tsv', source: 'YNet', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'AlAyyam.tsv', source: 'Al-Ayyam', reliability: 'Requires Verification', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'DailyStar.tsv', source: 'Daily Star LBN', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'AlRai.tsv', source: 'Al-Rai', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'AlManar.tsv', source: 'Al-Manar', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Pravda.tsv', source: 'Ukrayinska Pravda', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'WorldIsraelNews.tsv', source: 'World ISR News', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'IsraelHayom.tsv', source: 'Israel Hayom', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'EuroNews.tsv', source: 'Euro News', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'WGNTV.tsv', source: 'WGNTV', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'AzerbaijanNews.tsv', source: 'Azerbaijan News', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'IsraelNationalNews.tsv', source: 'ISR National News', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'UKRInform.tsv', source: 'UKR Inform', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'EuroMaidanPress.tsv', source: 'Euro Maidan Press', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'InterfaxUkraine.tsv', source: 'Interfax-Ukr', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'UkrNationalNews.tsv', source: 'UKR National News', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'MakoNews.tsv', source: 'Mako', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'NewVoiceofUkraine.tsv', source: 'New Voice of UKR', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'UNIAN.tsv', source: 'New Voice of UKR', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Yonhap.tsv', source: 'New Voice of UKR', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Walla.tsv', source: 'Walla', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'NHC.tsv', source: 'National Hurricane Center', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'KoreaTimesNews.tsv', source: 'Korea Times News', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'EurasianReview.tsv', source: 'Eurasian Review', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'KyodoNews.tsv', source: 'Kyodo News', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'CipherBrief.tsv', source: 'Cipher Brief', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'LopezDoriga.tsv', source: 'Lopez Doriga', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'WorldOnline.tsv', source: 'World Online', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'NPR.tsv', source: 'NPR', reliability: 'Credible', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'Reddit.tsv', source: 'Reddit', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] },
    { file: 'IslamTimes.tsv', source: 'IslamTimes', reliability: 'Dubious', background: '#203050', requiredTerms: [], ignoreTerms: [] }
  ];

  // List of sources with spoiler images
  const spoilerSources = [
    'Al-Ayyam',
    'Al-Rai',
    'Al-Manar'
  ];


  async function fetchTSVFile(url) {
    try {
      const response = await fetch(url);
      const tsvText = await response.text();
      return tsvText;
    } catch (error) {
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
      const imageUrl = item.Image?.trim(); // Extract the image URL from the TSV
      const magnitude = parseFloat(item.Magnitude?.trim());
  
      if (!pubDate) {
        return null; // Skip rows with invalid dates
      }
  
      // Determine the appropriate earthquake severity image based on the magnitude
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
  
      const earthquakeImage = magnitudeImage
        ? `<img src="${magnitudeImage}" alt="Earthquake Severity" width="50" height="50" style="border:0;" />`
        : '';
  
      const feedImage = imageUrl
        ? `<img src="${imageUrl}" alt="Feed image" height="225" style="border: 4px solid #191919; border-radius: 24px;" onerror="this.onerror=null;this.src='https://i.imgur.com/GQPN5Q9.jpeg';" />`
        : '';
  
      // Append images to the description
      const fullDescription = description + feedImage + earthquakeImage;
  
      return {
        title,
        link,
        description: fullDescription, // Include all images in the description
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
        const parsedTSV = parseTSV(tsvText, source, reliability, background, requiredTerms, ignoreTerms);
  
        if (parsedTSV.length > 0) {
          // Check if any new items are newer than the latest feed date
          const maxPubDate = new Date(Math.max(...parsedTSV.map(item => item.pubDate)));
          if (maxPubDate > latestFeedDate) {
            newFeedItems = true;
            latestFeedDate = maxPubDate; // Update the latest feed date
          }
        }
        // Call updateStatus for TSV sources
        updateStatus(source, `GoogleSheets/${file}`, parsedTSV.length > 0); // Use true if parsedTSV has items
  
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
    // Update the total sources count
    updateSourceCount();
  }
  
  function updateSourceCount() {
    const sourceCount = statusItems.size; // Total number of sources currently tracked
    const sourceCountElement = document.getElementById('source-count');
    sourceCountElement.textContent = `Total Sources Displayed: ${sourceCount}`;
  }
  
  function parseDate(dateString) {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate)) {
      return null; // Return null for invalid dates
    }
    return parsedDate;
  }

  function convertToTimezone(date, source) {
    const sourceTimeAdjustments = {
      'The Hill': -7,
      'World Online': -7,
      'UN News': -4,
      'The Star': -3,
      'Brandon Sun': -7,
      'The Hindu Business Line': 0.5,
      'Zee News India': -0.5,
      'Live Mint India': -6.5,
      'Channel 4 News': -7,
      'The New Zealand Herald': -3,
      'New York Post': -7,
      'USNI News': -7,
      'Israel Hayom': -7,
      'Blog4President': -2,
      'U.S. State Department - Africa': -7,
      'U.S. State Department - East Asia and the Pacific': -7,
      'U.S. State Department - Europe and Eurasia': -7,
      'U.S. State Department - Near East': -7,
      'U.S. State Department - South and Central Asia': -7,
      'U.S. Department of Defense': -2,
      'ISW': -7,
      'CBC': -3,
      'Factal Forecast': -3,
      'World News Era': -7,
      'South China Morning Post': -15, // Note: duplicate source entry removed
      'Taiwan Today': -3,
      'South China Morning Post (Alt)': -9,
      'The Federalist': -7,
      'Walla': -2,
      'International Atomic Energy Agency': -3,
    };
  
    // Set default time adjustment if no specific entry is found (0 hours adjustment).
    const defaultAdjustment = 0;
  
    // Calculate the adjusted time based on the source
    let adjustedDate = new Date(date);
    const adjustment = sourceTimeAdjustments[source] || defaultAdjustment;
  
    // Apply the time adjustment
    adjustedDate.setHours(adjustedDate.getHours() + adjustment);
  
    // Apply the current timezone offset (assuming currentTimezoneOffset is available globally)
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

  if (toggleLiveModeButton) {
      function toggleLiveMode() {
          isLiveMode = !isLiveMode;

          if (isLiveMode) {
              toggleLiveModeText.textContent = 'Switch to Static Mode';  // Update the text in the first span
              toggleLiveModeButton.classList.add('live-mode');  // Add live-mode class for the gradient animation
              toggleLiveModeButton.classList.remove('static-mode');  // Remove static-mode class

              // Fetch feeds immediately when switching to live mode (only once)
              if (!hasFetchedOnLiveToggle) {
                  fetchNewFeeds();  // Fetch new feeds once immediately
                  hasFetchedOnLiveToggle = true;  // Set flag to true so this only runs once per live toggle
              }

              if (!fetchIntervalID) {
                  fetchFeedsSequentially(); // Restart regular fetching if switched back to live mode
              }
          } else {
              toggleLiveModeText.textContent = 'Switch to Live Mode';  // Update the text in the first span
              toggleLiveModeButton.classList.remove('live-mode');  // Remove live-mode class
              toggleLiveModeButton.classList.add('static-mode');  // Add static-mode class

              // Reset the flag so that `fetchNewFeeds` will trigger again next time live mode is enabled
              hasFetchedOnLiveToggle = false;
          }

          console.log(`Live Mode: ${isLiveMode}`);
      }

      // Add initial live-mode class when the page loads if it's in live mode
      if (isLiveMode) {
          toggleLiveModeButton.classList.add('live-mode');
          toggleLiveModeText.textContent = 'Switch to Static Mode';
          fetchFeedsSequentially(); // Start fetching immediately when the page loads in live mode
      }

      // Add event listener to toggle live/static mode when button is clicked
      toggleLiveModeButton.addEventListener('click', toggleLiveMode);
  } else {
      console.error("Toggle Live Mode button not found in the DOM.");
  }

  async function fetchFeedsSequentially() {
    if (fetchIntervalID) {
      clearInterval(fetchIntervalID);  // Clear any existing interval to avoid duplicate intervals
    }

    if (!isLiveMode) {
      console.log('Static Mode: Fetching paused');
      return; // Don't fetch feeds if in static mode
    }

    const interval = 180000; // 3 minute interval
  
    const priorityIntervals = {
      'Very High': 30000, // 30 seconds
      'High': 60000, // 1 minute
      'Medium': 180000, // 3 minutes
      'Low': 300000, // 5 minutes
      'Very Low': 600000 // 10 minutes
    };
  
    // Fetch TSV files first
    const tsvFeedItems = await fetchTSVFiles();
    feedItems = [...feedItems, ...tsvFeedItems];
    
    // Fetch RSS feeds after TSV feeds
    await Promise.all(rssFeeds.map(feed => fetchFeedAndUpdate(feed)));
  
    // Sort by date, newest first
    feedItems.sort((a, b) => b.pubDate - a.pubDate);
    displayFeeds();
  
    // Schedule periodic fetching of RSS feeds (Only set interval once)
    fetchIntervalID = setInterval(() => {
      if (isLiveMode) {
        rssFeeds.forEach(feed => {
          const fetchInterval = priorityIntervals[feed.priorityLevel] || 180000;
          fetchFeedAndUpdate(feed);
        });
      }
    }, interval);

    // Fetch TSV files periodically
    fetchIntervalID = setInterval(async () => {
      if (isLiveMode) {
        const tsvFeedItems = await fetchTSVFiles();
        feedItems = [...feedItems.filter(item => !tsvFeedItems.find(tsvItem => tsvItem.title === item.title)), ...tsvFeedItems];
        feedItems.sort((a, b) => b.pubDate - a.pubDate); // Sort by date, newest first
        displayFeeds();
      }
    }, 60000); // Fetch TSV files every 1 minute
  }

  async function fetchNewFeeds() {
      console.log("Fetching new feeds immediately upon switching to live mode...");
      
      // Fetch the feeds as you would in your sequential fetching logic
      const tsvFeedItems = await fetchTSVFiles();
      feedItems = [...feedItems, ...tsvFeedItems];
      
      await Promise.all(rssFeeds.map(feed => fetchFeedAndUpdate(feed)));
      
      // Sort by date, newest first
      feedItems.sort((a, b) => b.pubDate - a.pubDate);
      displayFeeds(true);  // Reset and display the newly fetched feeds
  }

  async function fetchFeedAndUpdate(feed) {
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

  function applyTopicStyling(item, element) {
    let isNewItem = false;
    let selectedSoundFile = 'sounds/news-alert-notification.mp3'; // Default sound
    let matchedTopics = [];
  
    // Loop through topics to find matches
    for (const topic in topicKeywords) {
      if (topicKeywords.hasOwnProperty(topic)) {
        const { keywords, background, soundFile } = topicKeywords[topic];
        if (
          keywords.some(
            (keyword) =>
              item.description.toLowerCase().includes(keyword.toLowerCase()) ||
              item.title.toLowerCase().includes(keyword.toLowerCase())
          )
        ) {
          matchedTopics.push({ topic, background, soundFile });
  
          // Set the background and sound for the first match
          if (matchedTopics.length === 1) {
            item.background = background;
            selectedSoundFile = soundFile;
          }
  
          // Check if the item is new
          if (item.pubDate > latestFeedDate) {
            isNewItem = true;
            latestFeedDate = item.pubDate; // Update after processing
            playSound(selectedSoundFile, item.title); // Play the topic-specific sound
          }

          if (matchedTopics.length === 2) {
            break; // Stop checking after finding the first two matches
          }
        }
      }
    }
  
    // Apply gradient background if multiple topics match
    if (matchedTopics.length > 1) {
      const topTopics = matchedTopics.slice(0, 2); // Get the top two matched topics
      item.background = `linear-gradient(to right, ${topTopics[0].background}, ${topTopics[1].background})`;
    }
  
    // Set default background if no match found
    if (!isNewItem) {
      item.background = item.background || '#203050'; // Default background color
    }

    if (element) {
      element.style.background = item.background; // Apply dynamic background
    }
  }
  
  function playSound(soundFile, itemTitle) {
    const audio = new Audio(soundFile);
    audio.volume = pingVolume;
    audio.play().then(() => {
      console.log(`Sound file ${soundFile} played successfully for item: ${itemTitle}.`);
    }).catch(error => {
      console.error('Error playing sound:', error);
    });
  }

  function displayFeeds(isReset = true) {
  
    // Only clear feeds and reset the number of items when necessary (e.g., for new search or filter change)
    if (isReset) {
        currentlyDisplayedFeeds = 0; // Reset the number of displayed feeds only when necessary
        feedsContainer.innerHTML = ''; // Clear the container for a fresh start
    }
    feedItems = removeDuplicateTitles(feedItems);
  
    const now = new Date();
    const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
  
    const filteredFeeds = applyFilter();
  
    const searchTerm = searchInput.value.trim().toLowerCase();
    const searchTerms = parseSearchTerm(searchTerm);
  
    const recentFeeds = filteredFeeds.filter(item => item.pubDate > oneYearAgo);
  
    // Retrieve checkbox states
    const showCredible = document.getElementById('credibleFilter').checked;
    const showDubious = document.getElementById('dubiousFilter').checked;
    const showRequiresVerification = document.getElementById('requiresVerificationFilter').checked;

    // Filter feeds based on credibility checkboxes
    const credibilityFilteredFeeds = recentFeeds.filter(item => {
        if (item.reliability === 'Credible' && showCredible) return true;
        if (item.reliability === 'Dubious' && showDubious) return true;
        if (item.reliability === 'Requires Verification' && showRequiresVerification) return true;
        return false;
    });
  
    searchFilteredFeeds = credibilityFilteredFeeds.filter(item =>
        searchTerms.every(termGroup =>
            termGroup.some(term =>
                item.title.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term) ||
                item.source.toLowerCase().includes(term)
            )
        )
    );
  
    // **Sort the feeds by pubDate in descending order (newest first)**
    searchFilteredFeeds.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    // Load feeds in batches
    loadFeedsInBatches(searchFilteredFeeds);
  
    // Initialize observer for lazy loading if not initialized already
    if (!feedsObserver) {
        feedsObserver = new IntersectionObserver(handleFeedIntersection, {
            root: document.querySelector('.feed-container'), // Set the scrollable container as the root
            rootMargin: '0px 0px 200px 0px', // Load more feeds when the last feed is near the bottom (200px before the bottom)
            threshold: 0 // Trigger when any part of the last feed item is visible
        });
    }
  }
  
  function loadFeedsInBatches(feeds) {
    if (isFetchingFeeds) return; // Prevent fetching if another fetch is in progress
    isFetchingFeeds = true;

    // Save the current scroll position and container height before adding new items
    const scrollTopBefore = feedsContainer.scrollTop;
    const containerHeightBefore = feedsContainer.scrollHeight; // Total height before adding new feeds

    requestAnimationFrame(() => {
      const fragment = document.createDocumentFragment(); // Fragment to improve performance
      const feedsToLoad = feeds.slice(currentlyDisplayedFeeds, currentlyDisplayedFeeds + feedsBatchSize);
  
      feedsToLoad.forEach(item => {
        const feedItem = document.createElement('div');
        feedItem.classList.add('feed-item');
    
        const uniqueId = item.link || item.title;
        const isExpanded = expandedFeedItems.has(uniqueId);
    
        // Apply topic styling directly to the feed item element
        applyTopicStyling(item, feedItem);
    
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
    
        doc.querySelectorAll('img').forEach(img => img.remove());
        const cleanedDescription = doc.body.innerHTML;
    
        // Truncate long descriptions
        const maxLength = 400;
        let truncatedDescription = cleanedDescription;
        let toggleLink = '';
    
        if (!isExpanded && cleanedDescription.length > maxLength) {
          truncatedDescription = cleanedDescription.substring(0, maxLength) + '...';
          toggleLink = `<a href="#" class="see-more" data-id="${uniqueId}">See More</a>`;
        } else if (isExpanded && cleanedDescription.length > maxLength) {
          toggleLink = `<a href="#" class="see-less" data-id="${uniqueId}">See Less</a>`;
        }
  
        // Add the first image back to the feed element if it exists
        let imageHtml = '';
        if (firstImg) {
          if (item.source === 'USGS Earthquakes' || item.source === 'Global Shake Princeton') {
            imageHtml = `<img src="${firstImg.src}" alt="Earthquake Severity" width="50" height="50" style="border:0;" />`;
          } else {
            const isSpoilerSource = spoilerSources.includes(item.source);
            const imageClass = isSpoilerSource ? 'spoiler-image' : '';
            const revealButton = isSpoilerSource ? `<button class="reveal-button">Reveal Potentially Sensitive Image</button>` : '';
    
            imageHtml = `
              <div class="image-container">
                <img src="${firstImg.src}" class="${imageClass}" alt="Feed image" height="225" style="border: 4px solid #191919; border-radius: 24px;" onerror="this.onerror=null;this.src='https://i.imgur.com/GQPN5Q9.jpeg';" />
                ${revealButton}
              </div>`;
          }
        }
  
        // Use truncated description and toggleLink
        feedContent.innerHTML =
          `<h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
          ${imageHtml}
          <div>${truncatedDescription} ${toggleLink}</div>
          <p><small>Published on: ${format(item.pubDate, 'PPpp')} (${timezoneSelector.value})</small></p>
          <p><strong>Source:</strong> ${item.source}</p>`;
        
          // Inside the displayFeeds function, where we define the export icon
          const exportIcon = document.createElement('img');
          exportIcon.src = 'icons/ExportPDFUnClick.png';  // Default unclick icon
          exportIcon.classList.add('export-icon');
          exportIcon.style.position = 'absolute';  // Use absolute positioning within each feed item
          exportIcon.style.bottom = '10px';  // Bottom-right corner of each feed item
          exportIcon.style.right = '10px';  // Bottom-right corner of each feed item
          exportIcon.style.width = '30px';  // Size the icon
          exportIcon.style.height = '30px';  // Size the icon
          exportIcon.style.cursor = 'pointer';
          
          // Hover behavior for export icon
          exportIcon.addEventListener('mouseover', () => {
              exportIcon.src = 'icons/ExportPDFClick.png';  // Change to click icon on hover
          });
          exportIcon.addEventListener('mouseout', () => {
              exportIcon.src = 'icons/ExportPDFUnClick.png';  // Revert to default icon on hover out
          });
          
          // Click event to generate PDF
          exportIcon.addEventListener('click', () => {
              generatePDF(item);  // Call function to generate PDF with the feed item's content
          });
  
    
        feedItem.appendChild(credibilityContainer);
        feedItem.appendChild(feedContent);
        // Ensure the icon is added to each individual feed item, not the entire container
        feedItem.style.position = 'relative';  // Ensure feed item has relative positioning
        feedItem.appendChild(exportIcon);  // Append the icon directly to the feed item
        feedItem.classList.add('fade-in');
        fragment.append(feedItem);
      });
  
      feedsContainer.append(fragment);
      currentlyDisplayedFeeds += feedsToLoad.length;

      const containerHeightAfter = feedsContainer.scrollHeight; // Total height after adding new feeds
      const heightDifference = containerHeightAfter - containerHeightBefore; // Height difference added by new feeds
      feedsContainer.scrollTop = scrollTopBefore + heightDifference; // Adjust scroll to maintain user position
    
      // Update the feed count overlay
      const feedCountOverlay = document.getElementById('feed-count-overlay');
      feedCountOverlay.textContent = `Total Feed Items Displayed: ${currentlyDisplayedFeeds}`;
    
      isFetchingFeeds = false; // Reset fetching flag
    
      // Re-attach the observer only if more feeds are available to load
      if (currentlyDisplayedFeeds < feeds.length) {
        observeLastFeedItem();
      }
    
      // Add event listeners for "See More" and "See Less" links
      document.querySelectorAll('.see-more').forEach(link => {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          const fullDescription = this.getAttribute('data-id');
          expandedFeedItems.add(fullDescription); // Mark the item as expanded
          displayFeeds(); // Refresh the feed display to show the expanded content
        });
      });
    
      document.querySelectorAll('.see-less').forEach(link => {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          const fullDescription = this.getAttribute('data-id');
          expandedFeedItems.delete(fullDescription); // Mark the item as collapsed
          displayFeeds(); // Refresh the feed display to show the collapsed content
        });
      });
    
      // Add event listeners for "Reveal Spoiler" buttons
      document.querySelectorAll('.reveal-button').forEach(button => {
        button.addEventListener('click', function () {
          const image = this.previousElementSibling;
          image.classList.remove('spoiler-image'); // Remove the blur effect
          this.remove(); // Remove the "Reveal Spoiler" button
        });
      });
    });
  }
  
  function handleFeedIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target); // Stop observing the current target
        loadFeedsInBatches(searchFilteredFeeds); // Load more feeds
      }
    });
  }

  // Attach the observer to the last feed item
  function observeLastFeedItem() {
    const lastFeed = document.querySelector('.feed-item:last-child');
    if (lastFeed && feedsObserver) {
      feedsObserver.observe(lastFeed); // Observe the last feed item to load more on scroll
    }
  }
    
  async function generatePDF(feedItem) {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      // Get the page width (210mm for A4) and padding
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const leftPadding = 10;
      const rightPadding = 10;
      const topPadding = 10;
      const availableWidth = pageWidth - leftPadding - rightPadding;
  
      // Calculate image heights based on page width
      const headerHeight = pageWidth * 0.12588; // Header height ratio
      const credibilityHeight = pageWidth * 0.04156; // Credibility height ratio
  
      // Add the full-width header image at the top
      const headerImage = 'icons/ExportedEventHeader.png'; // Header image
      doc.addImage(headerImage, 'PNG', 0, 0, pageWidth, headerHeight); // Full width
  
      // Add the credibility image below the header
      let credibilityImage = '';
      switch (feedItem.reliability) {
          case 'Credible':
              credibilityImage = 'icons/ExportedEventCredibilityCredible.png';
              break;
          case 'Dubious':
              credibilityImage = 'icons/ExportedEventCredibilityDubious.png';
              break;
          case 'Requires Verification':
              credibilityImage = 'icons/ExportedEventCredibilityRequiresVerification.png';
              break;
      }
  
      if (credibilityImage) {
          doc.addImage(credibilityImage, 'PNG', 0, headerHeight, pageWidth, credibilityHeight);
      }
  
      // Set the position for the content below images and add a margin between credibility and title
      let contentYPosition = headerHeight + credibilityHeight + 10; // Added 10 units of margin below credibility image
  
      // Handle image extraction from the description, placing it before the title if present
      const imgElement = new Image();
      const regex = /<img.*?src=["'](.*?)["']/; // Extract image src from HTML
      const imgMatch = regex.exec(feedItem.description);
  
      if (imgMatch) {
          imgElement.src = imgMatch[1]; // Get the image URL from the matched regex
  
          imgElement.onload = () => {
              // Resize and constrain image to max 50mm in height
              let imgHeight = 50; // Maximum height for the image
              let imgWidth = imgElement.width * (imgHeight / imgElement.height);
  
              // Ensure image fits within the page width
              if (imgWidth > availableWidth) {
                  imgWidth = availableWidth;
                  imgHeight = imgElement.height * (imgWidth / imgElement.width);
              }
  
              // Center the image and add a border
              const imgXPosition = (pageWidth - imgWidth) / 2;
              const borderThickness = 2;
              doc.setDrawColor(0, 0, 0); // Black border
              doc.setLineWidth(borderThickness); // Border thickness
              doc.rect(imgXPosition, contentYPosition, imgWidth, imgHeight); // Border
  
              // Add image inside the border
              doc.addImage(imgElement, 'JPEG', imgXPosition, contentYPosition, imgWidth, imgHeight);
  
              contentYPosition += imgHeight + 10; // Adjust Y position after image and add margin after image
              renderRestOfPDF(); // Render the title and remaining content after the image
          };
      } else {
          // No image, render the rest of the content directly
          renderRestOfPDF();
      }
  
      function renderRestOfPDF() {
          // Title Wrapping (split the title if it's too long)
          doc.setFont("times", "bold");
          doc.setFontSize(14);
          const titleLines = doc.splitTextToSize(feedItem.title, availableWidth);  // Split title if it's too long
          doc.text(titleLines, leftPadding, contentYPosition);  // Add the title
  
          contentYPosition += titleLines.length * 7; // Adjust Y position after title
  
          // Wrap and render description text, handling page overflow
          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);
          const descriptionLines = doc.splitTextToSize(feedItem.description.replace(/<[^>]+>/g, ''), availableWidth);
          const linesHeight = descriptionLines.length * 5;
  
          // Check if description overflows and add a new page if necessary
          if (contentYPosition + linesHeight > pageHeight - topPadding) {
              doc.addPage(); // New page
              contentYPosition = topPadding; // Reset Y position for new page
          }
  
          doc.text(descriptionLines, leftPadding, contentYPosition);
          contentYPosition += linesHeight + 10;
  
          // Add publish date below description
          doc.setFontSize(10);
          doc.text(`Published on: ${feedItem.pubDate}`, leftPadding, contentYPosition);
          contentYPosition += 10;
  
          // Add source with a hyperlink
          const sourceLink = feedItem.link || '#';
          doc.setTextColor(0, 0, 255); // Blue color for the link
          doc.textWithLink(`Source: ${feedItem.source}`, leftPadding, contentYPosition, { url: sourceLink });
  
          // Underline the hyperlink text
          const sourceTextWidth = doc.getTextWidth(`Source: ${feedItem.source}`);
          doc.line(leftPadding, contentYPosition + 1, leftPadding + sourceTextWidth, contentYPosition + 1);
  
          // Save the PDF after everything is rendered
          doc.save(`${feedItem.title}.pdf`);
      }
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
  
    // Timeline filter
    const timelineValue = timelineFilter.value;
  
    if (timelineValue === 'lastHour') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 3600000);
    } else if (timelineValue === 'last12Hours') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 43200000);
    } else if (timelineValue === 'lastDay') {
      filteredFeeds = filteredFeeds.filter(item => now - item.pubDate <= 86400000);
    }
  
      // Topic filter: collect checked topics and apply filter
    const selectedTopics = [];
    document.querySelectorAll('.topic-filter input[type="checkbox"]:checked').forEach(checkbox => {
      selectedTopics.push(checkbox.value);
    });

  
    if (selectedTopics.length > 0) {
      filteredFeeds = filteredFeeds.filter(item => {
        return selectedTopics.some(topic => {
          if (topicKeywords[topic]) {
            const keywords = topicKeywords[topic].keywords.map(keyword => keyword.toLowerCase());
            return keywords.some(keyword => item.description.toLowerCase().includes(keyword));
          }
          return false;
        });
      });
    }

  
    // Source filter
    const checkedSources = Array.from(document.querySelectorAll('input[name="sourceFilter"]:checked')).map(cb => cb.value);
  
    if (checkedSources.length > 0 && !checkedSources.includes('all')) {
      filteredFeeds = filteredFeeds.filter(item => checkedSources.includes(item.source));
    }
  
    // Credibility filter
    const showCredible = document.getElementById('credibleFilter').checked;
    const showDubious = document.getElementById('dubiousFilter').checked;
    const showRequiresVerification = document.getElementById('requiresVerificationFilter').checked;
  
    filteredFeeds = filteredFeeds.filter(item => {
      if (item.reliability === 'Credible' && showCredible) return true;
      if (item.reliability === 'Dubious' && showDubious) return true;
      if (item.reliability === 'Requires Verification' && showRequiresVerification) return true;
      return false; // Exclude the item if it doesn't match any selected filters
    });
  
    return filteredFeeds;
  }


  document.getElementById('credibleFilter').addEventListener('change', debounce(displayFeeds, 300));
  document.getElementById('dubiousFilter').addEventListener('change', debounce(displayFeeds, 300));
  document.getElementById('requiresVerificationFilter').addEventListener('change', debounce(displayFeeds, 300));
  
  timelineFilter.addEventListener('change', debounce(displayFeeds, 300));
  // Remove this line since you're no longer using a single dropdown for topic filter
  // topicFilter.addEventListener('change', debounce(displayFeeds, 300)); 
  
  sourceFilterContainer.addEventListener('change', debounce(displayFeeds, 300));
  searchInput.addEventListener('input', debounce(displayFeeds, 300));
  volumeSlider.addEventListener('input', (event) => {
    pingVolume = event.target.value;
    console.log('Volume slider value:', pingVolume);
  });
  
  // Add event listeners to all topic filter checkboxes
  document.querySelectorAll('.topic-filter input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', debounce(displayFeeds, 300));
  });
  
  volumeSlider.value = pingVolume;
  
  populateSourceFilter();
  fetchFeedsSequentially();
});
