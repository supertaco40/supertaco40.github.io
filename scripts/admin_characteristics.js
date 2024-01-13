import {base_url, site_url} from './config.js';

document.addEventListener('DOMContentLoaded', function () {
  if (!getLogin().login) {
    window.location = `${site_url}/login.html`;
  }
  getCharacteristics();
  const form = document.getElementById('form');
  form.addEventListener('submit', createCharacteristic);
});

function getLogin() {
  return {
    login: localStorage.getItem('login'),
    password: localStorage.getItem('password'),
  };
}
function getForm() {
  return {
    metadescription: document.getElementById('metadescription').value ?? undefined,
    keyword: document.getElementById('keyword').value ?? undefined,
    name: document.getElementById('name').value ?? undefined,
    description: document.getElementById('description').value ?? undefined,
  };
}

function createCharacteristic(event) {
  event.preventDefault();
  fetch(`${base_url}/admin/characteristics.php`, {
    method: 'POST',
    body: JSON.stringify({
      ...getLogin(),
      ...getForm(),
    }),
  })
    .then(() => {
      getCharacteristics();
    })
    .catch(() => {
      window.location = `${site_url}/login.html`;
    });
}

function deleteBreed(breedId) {
  fetch(`${base_url}/admin/characteristics.php`, {
    method: 'DELETE',
    body: JSON.stringify({
      ...getLogin(),
      id: breedId,
    }),
  })
    .then(() => {
      getCharacteristics();
    })
    .catch(() => {
      window.location = `${site_url}/login.html`;
    });
}

function editBreed(breedId) {
  fetch(`${base_url}/admin/characteristics.php`, {
    method: 'PUT',
    body: JSON.stringify({
      ...getLogin(),
      id: breedId,
      ...getForm(),
    }),
  })
    .then(() => {
      getCharacteristics();
    })
    .catch(() => {
      window.location = `${site_url}/login.html`;
    });
}

function getCharacteristics() {
  fetch(`${base_url}/characteristics/all.php`)
    .then((response) => response.json())
    .then((data) => {
      writeTable(data);
    })
    .catch((error) => console.error('Error fetching breed data:', error));
}

function writeTable(data) {
  const breedTable = document.querySelector('table');
  breedTable.innerHTML = '';
  data.forEach((breed) => {
    const row = breedTable.insertRow(-1); // Insert a new row at the end
    const cellId = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellDescription = row.insertCell(2);
    const cellEdit = row.insertCell(3);
    const cellDelete = row.insertCell(4);

    // Populate the cells with breed data
    cellId.textContent = breed.id;
    cellName.textContent = breed.name;
    cellDescription.textContent = breed.description;

    // Create Edit and Delete links with breed ID
    const editButton = document.createElement('button');
    editButton.onclick = () => {
      editBreed(breed.id);
    };
    editButton.textContent = 'Edit';
    cellEdit.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.onclick = () => {
      deleteBreed(breed.id);
    };
    deleteButton.textContent = 'Delete';
    cellDelete.appendChild(deleteButton);
  });
}
