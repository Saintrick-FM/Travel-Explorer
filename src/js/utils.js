// Text utilities
export function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// API utilities
export async function fetchWithErrorHandling(url, options = {}) {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorMessage = `API Error (Status ${response.status}): `;
    if (response.status === 401) {
      throw new Error(errorMessage + "Invalid API key. Please check your configuration.");
    } else if (response.status === 404) {
      throw new Error(errorMessage + "Resource not found.");
    } else if (response.status === 429) {
      throw new Error(errorMessage + "API rate limit exceeded. Please try again later.");
    } else {
      throw new Error(errorMessage + "Failed to fetch data.");
    }
  }
  
  return response.json();
}

// UI utilities
export function showLoading(element, message) {
  element.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>${message}</p>
    </div>
  `;
}

export function showError(element, error) {
  console.error(error);
  element.innerHTML = `<p class="error">${error.message || 'An error occurred. Please try again.'}</p>`;
}

export async function loadPartials(currentPage) {
  try {
    // Load header
    const headerResponse = await fetch("/partials/header.html");
    const headerContent = await headerResponse.text();
    document.getElementById("header-partial").innerHTML = headerContent;

    // Load footer
    const footerResponse = await fetch("/partials/footer.html");
    const footerContent = await footerResponse.text();
    document.getElementById("footer-partial").innerHTML = footerContent;

    // Set active navigation state
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      const page = link.getAttribute("data-page");
      if (page === currentPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  } catch (error) {
    console.error("Error loading partials:", error);
  }
}
