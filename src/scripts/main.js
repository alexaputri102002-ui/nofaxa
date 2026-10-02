const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");

if (window.lucide) {
  window.lucide.createIcons();
}

const revealTargets = document.querySelectorAll(
  ".services, .service-card, .process, .process-step, .benefits, .benefit-item, .contact-cta",
);
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -32px 0px" },
  );

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal-item");
    target.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 90}ms`);
    revealObserver.observe(target);
  });
}

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
  );
  navPanel.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navPanel.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".navbar")) setMenuOpen(false);
});
