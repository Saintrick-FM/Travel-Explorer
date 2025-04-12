import { initSearch } from './search.js';
import { initWeather } from './weather.js';
import { initAttractions } from './attractions.js';
import { initCurrency } from './currency.js';
import { initFavorites } from './favorites.js';
import { initAnimations } from './animations.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initWeather();
  initAttractions();
  initCurrency();
  initFavorites();
  initAnimations();
});