// loginDNC.js
import configdnc from './configdnc.js';

function checkLoginDNC(event) {
  event.preventDefault();
  const users = configdnc.users;

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (users[username] && users[username] === password) {
    sessionStorage.setItem('loggedInDNC', 'true');
    sessionStorage.setItem('username', username);
    window.location.href = 'DNC.html';
  } else {
    alert('Incorrect username or password. Please try again.');
  }
}

export { checkLoginDNC };
