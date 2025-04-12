document.addEventListener("DOMContentLoaded", () => {
  displayFavorites();
});

export function initFavorites() {
  const favoriteBtns = document.querySelectorAll(".favorite-btn");
  favoriteBtns.forEach((btn) => {
    btn.addEventListener("click", handleFavorite);
  });
}

function handleFavorite(event) {
  const placeId = event.target.dataset.id;
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (!favorites.includes(placeId)) {
    favorites.push(placeId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    event.target.textContent = "Added to Favorites";
    event.target.disabled = true;
  }
}

function displayFavorites() {
  const favoritesContent = document.querySelector(".favorites-content");
  const favoritesList = document.querySelector(".favorites-grid");
  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    favoritesContent.innerHTML = `
   
      <div class="no-favorites-message hidden">
        <div class="message-content">
          <h2>No Favorites Yet</h2>
          <p>Start exploring destinations and add them to your favorites!</p>
          <a href="/index.html" class="explore-button">Explore Now</a>
        </div>

      </div>
    `;
    return;
  }

  favoritesList.innerHTML = favorites
    .map(
      (favorite) => `
      <div class="attraction-card">
        <div class="attraction-header">
          <h3>${favorite}</h3>
        </div>
      </div>
    `
    )
    .join("");
}
