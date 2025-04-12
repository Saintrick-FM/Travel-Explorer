// Example favorite item format
const newFavorite = {
  name: "Tokyo",
  image: "https://via.placeholder.com/300x200",
  description: "Where tradition meets technology.",
};

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Prevent duplicates
if (!favorites.find((item) => item.name === newFavorite.name)) {
  favorites.push(newFavorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
