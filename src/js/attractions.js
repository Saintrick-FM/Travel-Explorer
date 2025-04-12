const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API;

export function initAttractions() {
  console.log("Initializing attractions");
  // const storedAttractions = sessionStorage.getItem("attractions")
  //   ? JSON.parse(sessionStorage.getItem("attractions"))
  //   : null;

  // if (storedAttractions?.features) {
  //   displayAttractionCards(storedAttractions);
  // }
}

function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

export function displayAttractionCards(data) {
  const attractionsGrid = document.querySelector(".attractions-grid");
  console.log(data);
  attractionsGrid.innerHTML = data.features
    .map(
      (place) => `
      <div class="attraction-card">
        <div class="attraction-header">
          <h3 title="${place.properties.name || "Unnamed Location"}">
            ${truncateText(place.properties.name || "Unnamed Location", 30)}
          </h3>
          ${
            place.properties.brand
              ? `<span class="brand-tag" title="${place.properties.brand}">
              ${truncateText(place.properties.brand, 15)}
            </span>`
              : ""
          }
        </div>
        
        <div class="attraction-content">
          <div class="address">
            <i class="fas fa-map-marker-alt"></i>
            <p title="${place.properties.formatted}">
              ${truncateText(place.properties.formatted, 50)}
            </p>
          </div>
          
          <div class="details">
            <div class="detail-item">
              <i class="fas fa-clock"></i>
              <p title="${
                place.properties.opening_hours || "Hours not available"
              }">
                ${truncateText(
                  place.properties.opening_hours || "Hours not available",
                  20
                )}
              </p>
            </div>
            
            ${
              place.properties.website
                ? `<div class="detail-item">
                <i class="fas fa-globe"></i>
                <a href="${place.properties.website}" target="_blank" class="website-link">Visit Website</a>
              </div>`
                : ""
            }
          </div>
          
          <button class="favorite-btn" data-id="${place.properties.place_id}">
            <i class="far fa-heart"></i>
            Add to Favorites
          </button>
        </div>
      </div>
    `
    )
    .join("");
  sessionStorage.setItem("attractions", JSON.stringify(data));
  attachFavoriteListeners();
}

function attachFavoriteListeners() {
  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const attractionCard = event.target.closest(".attraction-card");
      const attractionName = attractionCard.querySelector("h3").textContent;
      addToFavorites(attractionName);
    });
  });
}

function addToFavorites(attraction) {
  let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  if (!favorites.includes(attraction)) {
    favorites.push(attraction);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
    showNotification(`${attraction} added to favorites!`);
  } else {
    showNotification(`${attraction} is already in favorites!`);
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

async function getCoordinates(destination) {
  const geocodeResponse = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      destination
    )}&format=json&apiKey=${GEOAPIFY_API_KEY}`
  );

  if (!geocodeResponse.ok) {
    throw new Error(`Geocoding failed (${geocodeResponse.status})`);
  }

  const geocodeData = await geocodeResponse.json();

  if (!geocodeData.results?.length) {
    throw new Error("Location not found");
  }

  const firstResult = geocodeData.results[0];
  const { lon1, lat1, lon2, lat2 } = firstResult.bbox;

  // Create the bounding box string in the required format
  return `rect:${lon1},${lat1},${lon2},${lat2}`;
}

export async function updateAttractions(destination) {
  const attractionsGrid = document.querySelector(".attractions-grid");

  // Show loading state
  attractionsGrid.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Finding attractions in ${destination}...</p>
    </div>
  `;

  try {
    // Add error handling for missing API key
    if (!GEOAPIFY_API_KEY) {
      throw new Error(
        "Geoapify API key not configured. Please check your .env file."
      );
    }

    if (!destination) {
      throw new Error("No destination specified");
    }

    // First get the coordinates for the destination
    const bbox = await getCoordinates(destination);

    // Now search for places within that bounding box
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=accommodation&filter=${bbox}&limit=10&apiKey=${GEOAPIFY_API_KEY}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      const errorMessage = `API Error (Status ${response.status}): `;
      if (response.status === 401) {
        throw new Error(
          errorMessage + "Invalid API key. Please check your Geoapify API key."
        );
      } else if (response.status === 404) {
        throw new Error(
          errorMessage +
            "Location not found. Please try a different destination."
        );
      } else if (response.status === 429) {
        throw new Error(
          errorMessage + "API rate limit exceeded. Please try again later."
        );
      } else {
        throw new Error(errorMessage + "Failed to fetch attractions data.");
      }
    }

    const data = await response.json();
    console.log({ data });
    if (!data.features || data.features.length === 0) {
      attractionsGrid.innerHTML = `
        <div class="error-message">
          <p>No supermarkets found near ${destination}.</p>
          <p>Try searching for a different location or expanding the search radius.</p>
        </div>`;
      return;
    }

    displayAttractionCards(data);
  } catch (error) {
    console.error("Error fetching attractions:", error);
    attractionsGrid.innerHTML = `<p class="error">${
      error.message || "Failed to load attractions. Please try again."
    }</p>`;
  }
}
