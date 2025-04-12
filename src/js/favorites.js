// favorites.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoritesContainer");

  const saved = JSON.parse(localStorage.getItem("favorites")) || [];

  if (saved.length === 0) {
    container.innerHTML =
      "<p style='padding:1rem;'>No favorites yet. Go explore and save some!</p>";
    return;
  }

  saved.forEach((dest) => {
    const card = document.createElement("div");
    card.className = "card fade-in";

    card.innerHTML = `
        <img src="${dest.image}" alt="${dest.name}" />
        <h3>${dest.name}</h3>
        <p>${dest.description || "No description available."}</p>
      `;

    container.appendChild(card);
  });
});
