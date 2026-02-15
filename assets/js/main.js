const filterButtons = document.querySelectorAll('.filters button');
const toolLinks = document.querySelectorAll('.tool-link');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    // Remove active class
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    toolLinks.forEach(link => {

      const card = link.querySelector('.tool-card');
      const category = card.getAttribute('data-category');

      if (filterValue === "all" || category === filterValue) {
        link.style.display = "block";
      } else {
        link.style.display = "none";
      }

    });

  });
});


// Drop dwon
const dropdown = document.querySelector(".dropdown");
const megaMenu = document.querySelector(".mega-menu");
const arrow = document.querySelector(".arrow");

let timeout;

/* OPEN */
dropdown.addEventListener("mouseenter", () => {
  clearTimeout(timeout);
  megaMenu.classList.add("active");
  arrow.style.transform = "rotate(180deg)";
});

/* CLOSE (with small delay for smooth movement) */
dropdown.addEventListener("mouseleave", () => {
  timeout = setTimeout(() => {
    megaMenu.classList.remove("active");
    arrow.style.transform = "rotate(0deg)";
  }, 150); // small delay prevents flicker
});

/* KEEP OPEN when hovering inside mega menu */
megaMenu.addEventListener("mouseenter", () => {
  clearTimeout(timeout);
});

megaMenu.addEventListener("mouseleave", () => {
  timeout = setTimeout(() => {
    megaMenu.classList.remove("active");
    arrow.style.transform = "rotate(0deg)";
  }, 150);
});

//Scrolling style hove nav bar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});