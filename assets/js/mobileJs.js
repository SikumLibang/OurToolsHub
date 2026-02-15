// Mobile Responsive
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const closeMenu = document.querySelector(".close-menu");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu
closeMenu.addEventListener("click", () => {
  navLinks.classList.remove("active");
});

// Handle dropdown toggles on mobile (width ≤ 860px)
const dropbtns = document.querySelectorAll(".dropbtn");
dropbtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    if (window.innerWidth <= 860) {
      e.preventDefault();
      // Find the parent dropdown (All Tools or Calculators)
      const parent = btn.closest(".dropdown, .dropdown1");
      if (parent) {
        parent.classList.toggle("active");
      }
    }
  });
});

// Close menu when any link (except dropdown toggles) is clicked
const navLinksAnchors = navLinks.querySelectorAll("a:not(.dropbtn)");
navLinksAnchors.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 860) {
      navLinks.classList.remove("active");
    }
  });
});