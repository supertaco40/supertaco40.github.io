import {base_url, site_url} from './config.js';

document.addEventListener('DOMContentLoaded', function () {
  if (!getLogin().login) {
    window.location = `${site_url}/login.html`;
  }
  getLinks();
  writeOptions();
  const form = document.getElementById('form');
  form.addEventListener('submit', createLink);
});

function getLogin() {
  return {
    login: localStorage.getItem('login'),
    password: localStorage.getItem('password'),
  };
}
function getForm() {
  return {
    breedid: document.getElementById('breed').value ?? undefined,
    characteristicid: document.getElementById('characteristic').value ?? undefined,
  };
}

function createLink(event) {
  event.preventDefault();
  fetch(`${base_url}/admin/links.php`, {
    method: 'POST',
    body: JSON.stringify({
      ...getLogin(),
      ...getForm(),
    }),
  })
    .then(() => {
      getLinks();
    })
    .catch(() => {
      window.location = `${site_url}/login.html`;
    });
}

function deleteLink(linkId) {
  fetch(`${base_url}/admin/links.php`, {
    method: 'DELETE',
    body: JSON.stringify({
      ...getLogin(),
      id: linkId,
    }),
  })
    .then(() => {
      getLinks();
    })
    .catch(() => {
      window.location = `${site_url}/login.html`;
    });
}

function getLinks() {
  fetch(`${base_url}/links/all.php`)
    .then((response) => response.json())
    .then((data) => {
      writeTable(data);
    })
    .catch((error) => console.error('Error fetching breed data:', error));
}

function writeOptions() {
  const Breed = document.getElementById('breed');
  Breed.innerHTML = '';
  fetch(`${base_url}/breeds/all.php`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((breed) => {
        Breed.innerHTML += `<option value="${breed.id}">${breed.name}</option>`;
      });
    });

  const Characteristic = document.getElementById('characteristic');
  Characteristic.innerHTML = '';
  fetch(`${base_url}/characteristics/all.php`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((characteristic) => {
        Characteristic.innerHTML += `<option value="${characteristic.id}">${characteristic.name}</option>`;
      });
    });
}

function writeTable(data) {
  const breedTable = document.querySelector('table');
  breedTable.innerHTML = '';
  data.forEach((link) => {
    const row = breedTable.insertRow(-1);
    const cellId = row.insertCell(0);
    const cellBreed = row.insertCell(1);
    const cellCharacteristic = row.insertCell(2);
    const cellDelete = row.insertCell(3);

    cellId.textContent = link.id;
    cellBreed.textContent = link.breed_name;
    cellCharacteristic.textContent = link.characteristic_name;

    const deleteButton = document.createElement('button');
    deleteButton.onclick = () => {
      deleteLink(link.id);
    };
    deleteButton.textContent = 'Delete';
    cellDelete.appendChild(deleteButton);
  });
}
