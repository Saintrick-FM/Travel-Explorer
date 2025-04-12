export function initAnimations() {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe all animatable elements
  document
    .querySelectorAll(".destination-info, .card, .attraction-card")
    .forEach((el) => {
      observer.observe(el);
    });
}
