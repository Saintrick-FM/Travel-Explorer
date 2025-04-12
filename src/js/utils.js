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
