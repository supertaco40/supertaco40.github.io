import {base_url, site_url} from './config.js';

const renderBreed = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const breed_id = urlParams.get('id');

  const result = await fetch(`${base_url}/breeds/all.php`);
  const breeds = await result.json();
  const breed = breeds.filter((breed_) => breed_.id == breed_id)[0];
  
  let metadescription = document.createElement('meta');
  metadescription.name="description";
  metadescription.content = breed.metadescription;
  document.getElementsByTagName('head')[0].appendChild(metadescription);
  
  let metakeyword = document.createElement('meta');
  metakeyword.name="keyword";
  metakeyword.content = breed.keyword;
  document.getElementsByTagName('head')[0].appendChild(metakeyword);

  //change page title
  document.title = `Порода ${breed.name}`;

  const breedImage = document.getElementById('breed-image');
  breedImage.setAttribute('src', `./images/breeds/${breed.name}.jpg`);

  const breedName = document.getElementById('breed-name');
  breedName.innerText = breed.name;

  const breedDescription = document.getElementById('breed-description');
  breedDescription.innerText = breed.description;

  const characteristicsResult = await fetch(`${base_url}/characteristics/by_breed.php?id=${breed_id}`);
  const characteristics = await characteristicsResult.json();
  const breedCharacteristics = document.getElementById('breed-characteristics');
  breedCharacteristics.innerHTML += `<ul class="breed__characteristic-title">Характеристики`;
  for (const characteristic of characteristics) {
    breedCharacteristics.innerHTML += `<li class="breed__characteristic">${characteristic.name}</li>`;
  }
  breedCharacteristics.innerHTML += `</ul>`;
};

window.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');
  renderBreed();
});
