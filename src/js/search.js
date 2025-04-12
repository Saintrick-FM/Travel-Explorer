import { updateWeather } from "./weather.js";
import { updateAttractions } from "./attractions.js";
import { updateCurrency } from "./currency.js";

export function initSearch() {
  const searchInput = document.getElementById("destination-search");
  const searchBtn = document.getElementById("search-btn");
  const destinationInfo = document.querySelector(".destination-info");

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  async function handleSearch() {
    const destination = searchInput.value.trim();
    if (!destination) return;

    try {
      destinationInfo.classList.remove("hidden");
      await Promise.all([
        updateWeather(destination),
        updateAttractions(destination),
        updateCurrency(destination),
      ]);
    } catch (error) {
      console.error("Error fetching destination data:", error);
    }
  }
}
