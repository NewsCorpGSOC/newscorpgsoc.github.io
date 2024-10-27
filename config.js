// config.js
const config = {
  users: {
    'tporter.consultant@newscorp.com': { password: 'GSOCIntranet2024!', role: 'siteadmin' },
    'lagsoc@newscorp.com': { password: 'GSOCIntranet2024', role: 'operations' },
    'acron.consultant@newscorp.com': { password: '4X70KSQrSuZp', role: 'manager' },
    'jormand.consultant@newscorp.com': { password: 'i7M2fLz72p6i', role: 'manager' },
    'ejany@newscorp.com': { password: 'Wekplarhosh23!', role: 'admin' },
    'okay@newscorp.com': { password: 'D6kQj96EY94l', role: 'director' },
    'dgalindo.consultant@newscorp.com': { password: '5Zq2l51U5Lf9', role: 'intelops' },
    'blagman.consultant@newscorp.com': { password: 'w8xcv4DXf8o3', role: 'operations' },
    'cpulido.consultant@newscorp.com': { password: 'kGx3iPzRh85z', role: 'operations' },
    'dgunabe.consultant@newscorp.com': { password: '6xhIY34zxb1u', role: 'operations' },
    'garena.consultant@newscorp.com': { password: '03Tul00kGrzq', role: 'operations' },
    'mhassan.consultant@newscorp.com': { password: '9A8xxV1UOVJh', role: 'operations' },
    'nwu.consultant@newscorp.com': { password: 'kvDcHW94993s', role: 'operations' },
    'sarana.consultant@newscorp.com': { password: 'd33kBto2oFO0', role: 'operations' },
    'ygastelum.consultant@newscorp.com': { password: '96a07QR7X2vw', role: 'operations' },
    'jmagallanes.consultant@newscorp.com': { password: 'highschoolmusical3', role: 'operations' },
    'peter.emerson-thomas@news.co.uk': { password: 'PeteETNewsUK2024!', role: 'securitymanager' },
    'harry.frankham@dowjones.com': { password: 'HarryFRDowJones2024!', role: 'securitymanager' },
    'gary.simpson@dowjones.com': { password: 'GarySIMDowJones2024!', role: 'securitymanager' },
    'paul.hutchinson@dowjones.com': { password: 'PaulHUTCHDowJones2024!', role: 'securitymanager' },
    'guest': { password: 'guest1234', role: 'guest' }
  },
  roles: {
    siteadmin: {
      pages: ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'],
      displayName: 'Site Administrator' // Display Name for siteadmin
    },
    manager: {
      pages: ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'],
      displayName: 'Manager'
    },
    director: {
      pages: ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'],
      displayName: 'Director'
    },
    admin: {
      pages: ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'],
      displayName: 'Admin'
    },
    operations: {
      pages: ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'],
      displayName: 'Operations'
    },
    intelops: {
      pages: ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'],
      displayName: 'Intelligence Operations'
    },
    securitymanager: {
      pages: ['RSSFeeds.html', 'index.html', 'mena-map.html', 'ukraine-conflict-map.html', 'intellihub.html', 'aboutme_Tanner_Porter.html', 'reliabilitymetrics.html', 'aboutme_Aidan_Cron.html', 'aboutme_Bianca_Lagman.html', 'aboutme_Camila_Pulido.html', 'aboutme_Daniel_Gunabe.html', 'aboutme_Diana_Galindo.html', 'aboutme_Giovanna_Arena.html', 'aboutme_Jacob_Ormand.html', 'aboutme_Jordy_Magallanes.html', 'aboutme_Nathan_Wu.html', 'aboutme_Savannah_Arana.html', 'aboutme_Yuri_Gastelum.html'],
      displayName: 'Security Manager'
    },
    guest: {
      pages: ['index.html'],
      displayName: 'Guest'
    }
  }
};

export default config;
