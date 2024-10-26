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
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('role', userRole);
    window.location.href = 'index.html';
  } else {
    alert('Incorrect username or password. Please try again.');
  }
}

export { checkLogin };
