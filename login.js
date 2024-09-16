// login.js
import config from './config.js';

function checkLogin(event) {
  event.preventDefault();
  const users = config.users;

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (users[username] && users[username].password === password) {
    // User is authenticated
    const userRole = users[username].role;
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('role', userRole);
    window.location.href = 'index.html';
  } else {
    alert('Incorrect username or password. Please try again.');
  }
}

export { checkLogin };
