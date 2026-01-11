import fetchCountries from "./fetchCountries";
import debounce from "debounce";

import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const inputRef = document.querySelector(".data-input");
const listRef = document.querySelector(".list");
const contRef = document.querySelector(".success-box");



inputRef.addEventListener("input", debounce(searchCountry, 500));

function searchCountry(event) {
  const countryName = event.target.value.trim();

  if (countryName === "") {
    return
  }
  
  listRef.innerHTML = "";
  contRef.innerHTML = "";
  
  fetchCountries(countryName).then(res => {
    if (res.length > 10) {
      error({
        text: "Забагато збігів. Зробіть запит більш специфічним",
        delay: 1250
      })
      return;
    }

    if (res.length > 1 && res.length <= 10) {
      listRef.innerHTML = "";
      contRef.innerHTML = "";

      const country = res.map(item => {
        return `<li class="item">${item.name.common}</li>`;
      }).join("");

      listRef.innerHTML = country;
    }

    if (res.length === 1) {
      contRef.innerHTML = "";

      const oneCountry = res.map(({ name, capital, population, flags, languages }) => {
        const langs = Object.values(languages);
        return contRef.innerHTML = `<h2 class="title">${name.common}</h2>
    <div class="box-big">
      <div class="box-new">
        <p class="capital"><b>Capital:</b> ${capital}</p>
        <p class="population"><b>Population:</b> ${population}</p>
        <p class="language"><b>Languages:</b></p>
        <ul class="lang-list">${langs.map(item => {
          return `<li class="lang-item">${item}</li>`
        }).join("")}</ul>
      </div>
      <img class="img" src="${flags.png}" alt="${flags.alt}">
    </div>`
      }).join("");

      // contRef.innerHTML = oneCountry;
    }
    return;
  })
}






// My code


// function searchCountry(event) {
//   fetchCountries(event.target.value).then(res => renderCountry(res.value));
//   console.log(fetchCountries(event.target.value));


// }

// function renderCountry(array) {
//   const item = array.map(({ altSpellings, capital, population, flags, languages }) => `<li class="item">
//       <p class="capital">${capital[0]}</p>
//       <p class="population">${population[0]}</p>
//       <p class="languages">${languages[0]}</p>
//       <img src="${flags[2]}" alt="flag of ${altSpellings[1]}" class="flag">
//     </li>`).join("");
  
//   listRef.innerHTML = item;
// }