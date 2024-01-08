import {base_url, site_url} from './config.js';
import PageCounter from './pages.js';

let pageCounter = new PageCounter();

let breeds = [];

const loadBreeds = async () => {
  const result = await fetch(`${base_url}/breeds/all.php`);
  breeds = await result.json();
};

const renderBreeds = async () => {
  const entries_list = document.getElementById('entries_list');
  entries_list.innerHTML = '';

  const searchedValue = document.getElementById('search-input').value;
  const pageSize = pageCounter.pageSize;
  const pageStart = pageSize * (pageCounter.currentValue - 1);
  const pageEnd = pageSize * pageCounter.currentValue;
  let currentRecord = 0;
  for (let i = 0; i < breeds.length; i++) {
    const breed = breeds[i];
    const wasSearched = breed.name.toUpperCase().includes(searchedValue.toUpperCase());
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
      <img class="entry__image" src="./images/breeds/${breed.name}.jpg" alt="Фото ${breed.name}" onerror="this.src='images/icons/none.png';" />
      <a class="entry__name" href="${site_url}/breed_page.html?id=${breed.id}">
        ${breed.name}
      </a>
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
  renderBreeds();
};

const incrementPage = () => {
  if (pageCounter.currentValue >= breeds.length / pageCounter.pageSize) {
    return;
  }

  pageCounter.currentValue += 1;
  renderBreeds();
};

const onLoad = async () => {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', renderBreeds);
  await loadBreeds();
  renderBreeds();
};

window.addEventListener('DOMContentLoaded', onLoad);
