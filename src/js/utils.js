export async function loadPartial(elementId, partialPath) {
    try {
        const response = await fetch(partialPath);
        const content = await response.text();
        document.getElementById(elementId).innerHTML = content;
        
        // Update active state in navigation
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    } catch (error) {
        console.error('Error loading partial:', error);
    }
}
