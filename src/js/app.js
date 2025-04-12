import { initSearch } from "./search.js";
import { initWeather } from "./weather.js";
import { initAttractions } from "./attractions.js";
import { initCurrency } from "./currency.js";
import { initFavorites } from "./favorites.js";
import { initAnimations } from "./animations.js";

import { loadPartials } from "./utils.js";

// Load header and footer with correct active state
const pathname = window.location.pathname;
let currentPage = "home";

if (pathname.includes("about.html")) {
  currentPage = "about";
} else if (pathname.includes("favorites.html")) {
  currentPage = "favorites";
}

loadPartials(currentPage);

// Initialize all modules
document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  initWeather();
  initAttractions();
  initCurrency();
  initFavorites();
  initAnimations();

  document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const attractionCard = event.target.closest('.attraction-card');
      const attractionName = attractionCard.querySelector('h3').textContent;
      addToFavorites(attractionName);
    });
  });

  function addToFavorites(attraction) {
    let favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];
    if (!favorites.includes(attraction)) {
      favorites.push(attraction);
      sessionStorage.setItem('favorites', JSON.stringify(favorites));
      showNotification(`${attraction} added to favorites!`);
    } else {
      showNotification(`${attraction} is already in favorites!`);
    }
  }

  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
});
