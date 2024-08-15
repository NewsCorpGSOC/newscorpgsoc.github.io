// login.js
import config from './configdnc.js';

function checkLogin(event) {
  event.preventDefault();
  const users = configdnc.users;

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (users[username] && users[username] === password) {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('username', username);
    window.location.href = 'index.html';
  } else {
    alert('Incorrect username or password. Please try again.');
  }
}

export { checkLogin };
