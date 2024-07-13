// login.js

function checkLogin(event) {
  event.preventDefault();
  const users = {
    'tporter.consultant@newscorp.com': 'GSOCIntranet2024!',
    'lagsoc@newscorp.com': 'GSOCIntranet2024'
  };

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
