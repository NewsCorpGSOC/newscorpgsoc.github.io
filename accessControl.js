// accessControl.js
(function() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const role = sessionStorage.getItem('role');
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page name

    if (!loggedIn) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    } else {
        const allowedPages = {
            'admin': ['index.html', 'admin.html', 'editor.html', 'viewer.html'],
            'editor': ['index.html', 'editor.html', 'viewer.html'],
            'viewer': ['index.html', 'viewer.html']
        };

        if (!allowedPages[role].includes(currentPage)) {
            alert('You do not have permission to access this page.');
            window.location.href = 'index.html'; // Redirect to a default page
        }
    }
})();
