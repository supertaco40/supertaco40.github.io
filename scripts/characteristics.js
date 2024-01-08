import {base_url, site_url} from './config.js';
import PageCounter from './pages.js';

let pageCounter = new PageCounter();

let characteristics = [];

const loadCharacteristics = async () => {
  const result = await fetch(`${base_url}/characteristics/all.php`);
  characteristics = await result.json();
};

const renderCharacteristics = async () => {
  const entries_list = document.getElementById('entries_list');
  entries_list.innerHTML = '';

  const searchedValue = document.getElementById('search-input').value;
  const pageSize = pageCounter.pageSize;
  const pageStart = pageSize * (pageCounter.currentValue - 1);
  const pageEnd = pageSize * pageCounter.currentValue;
  let currentRecord = 0;
  for (let i = 0; i < characteristics.length; i++) {
    const characteristic = characteristics[i];
    const wasSearched = characteristic.name.toUpperCase().includes(searchedValue.toUpperCase());
    if (!wasSearched) {
      continue;
    }
    currentRecord += 1;

    if (currentRecord <= pageStart) {
      continue;
    }

    if (currentRecord > pageEnd) {
      break;
    }

    entries_list.innerHTML += `<div class="list__entry">
      <img class="entry__image" src="./images/characteristics/${characteristic.name}.jpg" alt="Фото ${characteristic.name}" onerror="this.src='images/icons/none.png';" />
      <a class="entry__name" href="${site_url}/characteristic_page.html?id=${characteristic.id}">${characteristic.name} порода</a>
      </div>`;
  }

  pageCounter.render();
  const decrementButton = document.getElementById('page-decrement');
  decrementButton.addEventListener('click', decrementPage);
  const incrementButton = document.getElementById('page-increment');
  incrementButton.addEventListener('click', incrementPage);
};

const decrementPage = () => {
  if (pageCounter.currentValue <= 1) {
    return;
  }

  pageCounter.currentValue -= 1;
  renderCharacteristics();
};

const incrementPage = () => {
  if (pageCounter.currentValue >= characteristics.length / pageCounter.pageSize) {
    return;
  }

  pageCounter.currentValue += 1;
  renderCharacteristics();
};

const onLoad = async () => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', renderCharacteristics);
  await loadCharacteristics();
  renderCharacteristics();
};

window.addEventListener('DOMContentLoaded', onLoad);
