// SETTINGS
const DEFAULT_VISIBLE = 6;


// SEARCH FUNCTION
// const searchInput = document.getElementById("searchInput");

// searchInput.addEventListener("keyup", function () {
//   const searchValue = this.value.toLowerCase();
//   const allCards = document.querySelectorAll(".tool-card");

//   allCards.forEach(card => {
//     const text = card.textContent.toLowerCase();
//     card.style.display = text.includes(searchValue) ? "block" : "none";
//   });
// });

const searchInput = document.getElementById("searchInput");
const categories = document.querySelectorAll(".category");

searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase().trim();

  categories.forEach((category) => {
    const cards = category.querySelectorAll(".tool-card");
    let matchFound = false;

    cards.forEach((card) => {
      const text = card.innerText.toLowerCase();

      if (text.includes(searchTerm)) {
        card.style.display = "block";
        matchFound = true;
      } else {
        card.style.display = "none";
      }
    });

    // Show category only if match found
    if (matchFound) {
      category.style.display = "block";
    } else {
      category.style.display = "none";
    }
  });

  // If search is empty, reset everything
  if (searchTerm === "") {
    categories.forEach((category) => {
      category.style.display = "block";

      const cards = category.querySelectorAll(".tool-card");
      cards.forEach((card) => {
        card.style.display = "block";
      });
    });
  }
});

// AUTO LIMIT + TOGGLE SYSTEM
document.querySelectorAll(".category").forEach(category => {

  const cards = category.querySelectorAll(".tool-card");
  const toggleBtn = category.querySelector(".view-toggle");

  // If no toggle button, skip
  if (!toggleBtn) return;

  // Hide items beyond DEFAULT_VISIBLE automatically
  if (cards.length > DEFAULT_VISIBLE) {
    cards.forEach((card, index) => {
      if (index >= DEFAULT_VISIBLE) {
        card.style.display = "none";
      }
    });
  } else {
    // If 6 or less, hide button completely
    toggleBtn.style.display = "none";
  }

  // Toggle Click
  toggleBtn.addEventListener("click", function () {

    const expanded = this.classList.contains("expanded");

    if (!expanded) {
      // SHOW ALL
      cards.forEach(card => {
        card.style.display = "block";
      });

      this.textContent = "Show Less ←";
      this.classList.add("expanded");

    } else {
      // HIDE BACK TO FIRST 6
      cards.forEach((card, index) => {
        card.style.display = index < DEFAULT_VISIBLE ? "block" : "none";
      });

      this.textContent = "View All →";
      this.classList.remove("expanded");

      // Smooth scroll to category top (premium feel)
      category.scrollIntoView({ behavior: "smooth" });
    }

  });

});