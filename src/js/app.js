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
});
