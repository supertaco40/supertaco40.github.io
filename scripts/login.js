import {base_url, site_url} from './config.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', sumbitHandler);
});

function sumbitHandler(event) {
  event.preventDefault();
  const login = document.getElementById('login').value;
  const password = document.getElementById('password').value;
  fetch(`${base_url}/admin/login.php`, {
    method: 'POST',
    body: JSON.stringify({login: login, password: password}),
    headers: {'Content-Type': 'application/json'},
  })
    .then((data) => {
      return JSON.stringify(data);
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem('login', login);
      localStorage.setItem('password', password);
      window.location = `${site_url}/admin_breeds.html`;
    })
    .catch(() => {
      alert('Неверный логин или пароль');
    });
}
