// accessControl.js
(function() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const role = sessionStorage.getItem('role');
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page name

    if (!loggedIn) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    } else {
        const allowedPages = {
            'siteadmin': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'], // Full access
            'manager': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'], // Full access
            'operations': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'], // Can edit content
            'intelops': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'], // Read-only access
            'guest': ['index.html'] // Read-only access
        };

        if (!allowedPages[role] || !allowedPages[role].includes(currentPage)) {
            window.location.href = 'access-denied.html'; // Redirect to Access Denied page
        }
    }
})();
