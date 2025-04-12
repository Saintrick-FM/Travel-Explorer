export function initFavorites() {
  const favoriteBtns = document.querySelectorAll('.favorite-btn');
  
  favoriteBtns.forEach(btn => {
    btn.addEventListener('click', handleFavorite);
  });
}

function handleFavorite(event) {
  const placeId = event.target.dataset.id;
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  if (!favorites.includes(placeId)) {
    favorites.push(placeId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    event.target.textContent = 'Added to Favorites';
    event.target.disabled = true;
  }
}