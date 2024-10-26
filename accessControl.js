document.addEventListener('DOMContentLoaded', function() {
    const loggedIn = localStorage.getItem('loggedIn');
    const username = localStorage.getItem('username'); // Retrieve username
    const role = localStorage.getItem('role'); // Retrieve role
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page name

    // Define role display names
    const roleDisplayNames = {
        'siteadmin': 'Site Administrator',
        'manager': 'Manager',
        'director': 'Director',
        'admin': 'Admin',
        'operations': 'Operations',
        'intelops': 'Intelligence Operations',
        'guest': 'Guest'
    };

    const displayName = roleDisplayNames[role] || role; // Fallback to role ID if no display name is found

    console.log('Logged in:', loggedIn); // Debugging
    console.log('Username:', username); // Debugging
    console.log('Role:', role); // Debugging
    console.log('Current page:', currentPage); // Debugging

    // If not logged in, redirect to login page
    if (!loggedIn) {
        window.location.href = 'login.html';
    } else {
        // Define allowed pages per role
        const allowedPages = {
            'siteadmin': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html', 'intellihubinputs.html', 'intellihub.html', 'aboutme_Tanner_Porter.html', 'reliabilitymetrics.html', 'aboutme_Aidan_Cron.html', 'aboutme_Bianca_Lagman.html', 'aboutme_Camila_Pulido.html', 'aboutme_Daniel_Gunabe.html', 'aboutme_Diana_Galindo.html', 'aboutme_Giovanna_Arena.html', 'aboutme_Jacob_Ormand.html', 'aboutme_Jordy_Magallanes.html', 'aboutme_Nathan_Wu.html', 'aboutme_Savannah_Arana.html', 'aboutme_Yuri_Gastelum.html'],
            'manager': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html', 'intellihubinputs.html', 'intellihub.html', 'aboutme_Tanner_Porter.html', 'reliabilitymetrics.html', 'aboutme_Aidan_Cron.html', 'aboutme_Bianca_Lagman.html', 'aboutme_Camila_Pulido.html', 'aboutme_Daniel_Gunabe.html', 'aboutme_Diana_Galindo.html', 'aboutme_Giovanna_Arena.html', 'aboutme_Jacob_Ormand.html', 'aboutme_Jordy_Magallanes.html', 'aboutme_Nathan_Wu.html', 'aboutme_Savannah_Arana.html', 'aboutme_Yuri_Gastelum.html'],
            'director': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html', 'intellihubinputs.html', 'intellihub.html', 'aboutme_Tanner_Porter.html', 'reliabilitymetrics.html', 'aboutme_Aidan_Cron.html', 'aboutme_Bianca_Lagman.html', 'aboutme_Camila_Pulido.html', 'aboutme_Daniel_Gunabe.html', 'aboutme_Diana_Galindo.html', 'aboutme_Giovanna_Arena.html', 'aboutme_Jacob_Ormand.html', 'aboutme_Jordy_Magallanes.html', 'aboutme_Nathan_Wu.html', 'aboutme_Savannah_Arana.html', 'aboutme_Yuri_Gastelum.html'],
            'admin': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html', 'intellihub.html', 'aboutme_Tanner_Porter.html', 'reliabilitymetrics.html', 'aboutme_Aidan_Cron.html', 'aboutme_Bianca_Lagman.html', 'aboutme_Camila_Pulido.html', 'aboutme_Daniel_Gunabe.html', 'aboutme_Diana_Galindo.html', 'aboutme_Giovanna_Arena.html', 'aboutme_Jacob_Ormand.html', 'aboutme_Jordy_Magallanes.html', 'aboutme_Nathan_Wu.html', 'aboutme_Savannah_Arana.html', 'aboutme_Yuri_Gastelum.html'],
            'operations': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html', 'intellihubinputs.html', 'intellihub.html', 'aboutme_Tanner_Porter.html', 'reliabilitymetrics.html', 'aboutme_Aidan_Cron.html', 'aboutme_Bianca_Lagman.html', 'aboutme_Camila_Pulido.html', 'aboutme_Daniel_Gunabe.html', 'aboutme_Diana_Galindo.html', 'aboutme_Giovanna_Arena.html', 'aboutme_Jacob_Ormand.html', 'aboutme_Jordy_Magallanes.html', 'aboutme_Nathan_Wu.html', 'aboutme_Savannah_Arana.html', 'aboutme_Yuri_Gastelum.html'],
            'intelops': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html', 'intellihubinputs.html', 'intellihub.html', 'aboutme_Tanner_Porter.html', 'reliabilitymetrics.html', 'aboutme_Aidan_Cron.html', 'aboutme_Bianca_Lagman.html', 'aboutme_Camila_Pulido.html', 'aboutme_Daniel_Gunabe.html', 'aboutme_Diana_Galindo.html', 'aboutme_Giovanna_Arena.html', 'aboutme_Jacob_Ormand.html', 'aboutme_Jordy_Magallanes.html', 'aboutme_Nathan_Wu.html', 'aboutme_Savannah_Arana.html', 'aboutme_Yuri_Gastelum.html'],
            'guest': ['index.html']
        };

        // Redirect to access denied page if role is not allowed to access the page
        if (!allowedPages[role] || !allowedPages[role].includes(currentPage)) {
            window.location.href = 'access-denied.html';
        }

        // Display the logged-in username and "Sign out" button with role
        displayLoggedInUser(username, displayName); // Pass both username and role
    }

    function displayLoggedInUser(username, displayName) {
        if (username) {
            console.log('Displaying username:', username);

            const userInfoDiv = document.createElement('div');
            userInfoDiv.id = 'user-info';
            userInfoDiv.className = 'user-info';
            userInfoDiv.textContent = `Logged in as: ${username} | Role: ${displayName}`;

            const signOutButton = document.createElement('button');
            signOutButton.textContent = 'Sign out';
            signOutButton.style.marginLeft = '10px';
            signOutButton.style.backgroundColor = 'rgba(0, 214, 227, 0.8)';
            signOutButton.style.fontWeight = 'bold';
            signOutButton.style.border = 'none';
            signOutButton.style.padding = '5px 10px';
            signOutButton.style.borderRadius = '5px';
            signOutButton.style.cursor = 'pointer';
            signOutButton.style.transition = 'background-color 0.3s';

            signOutButton.onmouseover = function() {
                signOutButton.style.backgroundColor = 'rgba(0, 184, 197, 0.8)';
            };
            signOutButton.onmouseout = function() {
                signOutButton.style.backgroundColor = 'rgba(0, 214, 227, 0.8)';
            };

            signOutButton.onclick = function() {
                signOut();
            };

            userInfoDiv.appendChild(signOutButton);
            document.body.appendChild(userInfoDiv);

            userInfoDiv.style.position = 'fixed';
            userInfoDiv.style.top = '10px';
            userInfoDiv.style.right = '10px';
            userInfoDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            userInfoDiv.style.fontWeight = 'bold';
            userInfoDiv.style.padding = '5px 10px';
            userInfoDiv.style.borderRadius = '5px';
            userInfoDiv.style.fontSize = '14px';
            userInfoDiv.style.fontFamily = '"EB Garamond", serif';
            userInfoDiv.style.zIndex = '1000';
            userInfoDiv.style.color = '#333';
        } else {
            console.log('No username found in session storage.');
        }
    }

    function signOut() {
        localStorage.clear();
        window.location.href = 'login.html';
    }
});

