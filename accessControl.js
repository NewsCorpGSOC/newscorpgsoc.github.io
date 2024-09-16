document.addEventListener('DOMContentLoaded', function() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const username = sessionStorage.getItem('username'); // Retrieve username
    const role = sessionStorage.getItem('role');
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page name
    
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
            'siteadmin': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'], // Full access
            'manager': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'], // Full access
            'operations': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'], // Can edit content
            'intelops': ['DNC.html', 'DNCMap.html', 'NYCWebCams.html', 'RNCMap.html', 'RSSFeeds.html', 'emergency-response-los-angeles.html', 'global-map.html', 'google-earth-assets-map.html', 'gsoc-osint-toolbox.html', 'index.html', 'mena-map.html', 'onboarding.html', 'page1.html', 'ukraine-conflict-map.html'], // Read-only access
            'guest': ['index.html'] // Read-only access
        };

        // Redirect to access denied page if role is not allowed to access the page
        if (!allowedPages[role] || !allowedPages[role].includes(currentPage)) {
            window.location.href = 'access-denied.html';
        }

        // Display the logged-in username
        displayLoggedInUser(username);
    }

    // Function to display the logged-in username in the top right corner
    function displayLoggedInUser(username) {
        if (username) {
            console.log('Displaying username:', username); // Debugging

            // Create a div element for displaying user information
            const userInfoDiv = document.createElement('div');
            userInfoDiv.id = 'user-info';
            userInfoDiv.className = 'user-info';
            userInfoDiv.textContent = `Logged in as: ${username}`;
            
            // Append the div to the body
            document.body.appendChild(userInfoDiv);

            // Apply styling directly via JavaScript
            userInfoDiv.style.position = 'fixed';
            userInfoDiv.style.top = '10px';
            userInfoDiv.style.right = '10px';
            userInfoDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
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
});
