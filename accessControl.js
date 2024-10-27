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

    // Get the display name for the role
    const displayName = roleDisplayNames[role] || role; // Fallback to role ID if no display name is found

    console.log('Logged in:', loggedIn); // Debugging
    console.log('Username:', username); // Debugging
    console.log('Role:', role); // Debugging
    console.log('Current page:', currentPage); // Debugging
    

    // If not logged in, redirect to login page
    if (!loggedIn) {
        // Save the current URL to localStorage so we can redirect back to it after login
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'login.html';
    }
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

    // Function to display the logged-in username and "Sign out" button in the top right corner
    function displayLoggedInUser(username, displayName) {
        if (username) {
            console.log('Displaying username:', username); // Debugging

            // Create a div element for displaying user information
            const userInfoDiv = document.createElement('div');
            userInfoDiv.id = 'user-info';
            userInfoDiv.className = 'user-info';
            userInfoDiv.textContent = `Logged in as: ${username} | Role: ${displayName}`; // Display both username and display name

            // Create "Sign out" button
            const signOutButton = document.createElement('button');
            signOutButton.textContent = 'Sign out';
            signOutButton.style.marginLeft = '10px'; // Add some space between the text and the button
            signOutButton.style.backgroundColor = 'rgba(0, 214, 227, 0.8)';
            signOutButton.style.fontWeight = 'bold'; // Bold the text
            signOutButton.style.border = 'none'; // Remove default border
            signOutButton.style.padding = '5px 10px'; // Add padding
            signOutButton.style.borderRadius = '5px'; // Rounded corners
            signOutButton.style.cursor = 'pointer'; // Change cursor to pointer on hover
            signOutButton.style.transition = 'background-color 0.3s'; // Smooth transition for hover effect

            // Change background color on hover
            signOutButton.onmouseover = function() {
                signOutButton.style.backgroundColor = 'rgba(0, 184, 197, 0.8)'; // Darker shade on hover
            };
            signOutButton.onmouseout = function() {
                signOutButton.style.backgroundColor = 'rgba(0, 214, 227, 0.8)'; // Original shade
            };

            // Sign out functionality
            signOutButton.onclick = function() {
                signOut();
            };

            // Append button to the user info div
            userInfoDiv.appendChild(signOutButton);
            
            // Append the div to the body
            document.body.appendChild(userInfoDiv);

            // Apply styling directly via JavaScript
            userInfoDiv.style.position = 'fixed';
            userInfoDiv.style.top = '10px';
            userInfoDiv.style.right = '10px';
            userInfoDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            userInfoDiv.style.fontWeight = 'bold'; // Bold the text
            userInfoDiv.style.padding = '5px 10px';
            userInfoDiv.style.borderRadius = '5px';
            userInfoDiv.style.fontSize = '14px';
            userInfoDiv.style.fontFamily = '"EB Garamond", serif'; // Use EB Garamond font
            userInfoDiv.style.zIndex = '1000';
            userInfoDiv.style.color = '#333';

        } else {
            console.log('No username found in session storage.'); // Debugging
        }
    }

    // Function to handle sign out
    function signOut() {
        // Clear session storage
        localStorage.clear();
        // Redirect to the login page
        window.location.href = 'login.html';
    }
});
