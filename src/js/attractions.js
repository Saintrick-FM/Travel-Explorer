const FOURSQUARE_API_KEY = decodeURIComponent(import.meta.env.VITE_FOURSQUARE_API_KEY);

export function initAttractions() {
  // Initialize attractions module
}

export async function updateAttractions(destination) {
  const attractionsGrid = document.querySelector(".attractions-grid");

  try {
    if (!FOURSQUARE_API_KEY) {
      throw new Error(
        "Foursquare API key not configured. Please check your .env file."
      );
    }

    if (!destination) {
      throw new Error("No destination specified");
    }

    console.log('Using Foursquare API key:', FOURSQUARE_API_KEY);
    
    const response = await fetch(
      `https://api.foursquare.com/v3/places/search?near=${encodeURIComponent(destination)}&limit=6&sort=RATING`,
      {
        headers: {
          Authorization: FOURSQUARE_API_KEY.startsWith('Bearer ') ? FOURSQUARE_API_KEY : `Bearer ${FOURSQUARE_API_KEY}`,
          Accept: "application/json",
        },
      }
    );
    
    console.log('Foursquare response:', response.status, response.statusText);

    if (!response.ok) {
      const errorMessage = `API Error (Status ${response.status}): `;
      if (response.status === 401) {
        throw new Error(
          errorMessage +
            "Invalid API key. Please check your Foursquare API key."
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

    if (!data.results || data.results.length === 0) {
      attractionsGrid.innerHTML =
        '<p class="error">No attractions found for this destination.</p>';
      return;
    }

    attractionsGrid.innerHTML = data.results
      .map(
        (place) => `
      <div class="attraction-card">
        <img src="${place.photos?.[0]?.prefix}300x200${place.photos?.[0]?.suffix}" 
             alt="${place.name}" 
             onerror="this.src='/assets/placeholder.jpg'">
        <div class="content">
          <h3>${place.name}</h3>
          <p>${place.location.formatted_address}</p>
          <button class="favorite-btn" data-id="${place.fsq_id}">
            Add to Favorites
          </button>
        </div>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching attractions:", error);
    attractionsGrid.innerHTML = `<p class="error">${
      error.message || "Failed to load attractions. Please try again."
    }</p>`;
  }
}
