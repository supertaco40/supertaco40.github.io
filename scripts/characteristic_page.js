import {base_url, site_url} from './config.js';

const renderCharacteristic = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const characteristic_id = urlParams.get('id');

  const result = await fetch(`${base_url}/characteristics/all.php`);
  const characteristics = await result.json();
  const characteristic = characteristics.filter((characteristic) => characteristic.id == characteristic_id)[0];

  let metadescription = document.createElement('meta');
  metadescription.name="description";
  metadescription.content = characteristic.metadescription;
  document.getElementsByTagName('head')[0].appendChild(metadescription);
  
  let metakeyword = document.createElement('meta');
  metakeyword.name="keyword";
  metakeyword.content = characteristic.keyword;
  document.getElementsByTagName('head')[0].appendChild(metakeyword);
  
  //change page title
  document.title = `Характеристика ${characteristic.name}`;

  const image = document.getElementById('characteristic-image');
  image.setAttribute('src', `./images/characteristics/${characteristic.name}.jpg`);

  const characteristicName = document.getElementById('characteristic-name');
  characteristicName.innerText = `${characteristic.name} порода`;

  const description = document.getElementById('description-block');
  const paragraphs = characteristic.description.split('\n');
  for (const paragraph of paragraphs) {
    description.innerHTML += `<p class="characteristic__description" id="description">${paragraph}</p>`;
  }

  const breeds_result = await fetch(`${base_url}/breeds/by_characteristic.php?id=${characteristic.id}`);
  const breeds = await breeds_result.json();
  console.log(breeds);
  const entries_list = document.getElementById('entries_list');
  breeds.forEach((breed) => {
    entries_list.innerHTML += `<div class="list__entry">
      <img class="entry__image" src="./images/breeds/${breed.name}.jpg" alt="Фото ${breed.name}" />
      <a class="entry__name" href="${site_url}/breed_page.html?id=${breed.id}">${breed.name}</a>
    </div>`;
  });
};

window.addEventListener('DOMContentLoaded', renderCharacteristic);
