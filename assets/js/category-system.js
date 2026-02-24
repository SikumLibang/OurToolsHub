/* ===============================
   CATEGORY SYSTEM - COMPLETE
================================ */

document.addEventListener("DOMContentLoaded", function () {

  console.log("Category System Loaded ✅");

  /* ===============================
     TOOL DATABASE
  =============================== */

  const toolsData = {
    calculator: [
      {
        name: "BMI Calculator",
        description: "Calculate your body mass index quickly and accurately.",
        link: "/calculators/bmi-calculator.html",
        icon: "⚖️"
      },
      {
        name: "Age Calculator",
        description: "Find your exact age in years, months and days.",
        link: "/calculators/age-calculator.html",
        icon: "🎂"
      },
      {
        name: "EMI Calculator",
        description: "Calculate monthly loan payments easily.",
        link: "/calculators/emi-calculator.html",
        icon: "🏦"
      },
      {
        name: "Discount Calculator",
        description: "Calculate final price after discount.",
        link: "/calculators/discount-calculator.html",
        icon: "💰"
      }
    ],

    converter: [
      {
        name: "Binary to Decimal",
        description: "Convert binary numbers to decimal format.",
        link: "/converters/binary-to-decimal.html",
        icon: "🔢"
      },
      {
        name: "Decimal to Binary",
        description: "Convert decimal numbers to binary format.",
        link: "/converters/decimal-to-binary.html",
        icon: "🔄"
      },
      {
        name: "Temperature Converter",
        description: "Convert Celsius, Fahrenheit and Kelvin.",
        link: "/converters/temperature-converter.html",
        icon: "🌡️"
      },
      {
        name: "Length Converter",
        description: "Convert meters, feet, inches and more.",
        link: "/converters/length-converter.html",
        icon: "📏"
      }
    ],

    text: [
      {
        name: "Word Counter",
        description: "Count words and characters instantly.",
        link: "/text-tools/word-counter.html",
        icon: "📝"
      },
      {
        name: "Case Converter",
        description: "Convert text to upper, lower or title case.",
        link: "/text-tools/case-converter.html",
        icon: "🔤"
      }
    ],

    developer: [
      {
        name: "JSON Formatter",
        description: "Format and beautify JSON data easily.",
        link: "/developer-tools/json-formatter.html",
        icon: "🧾"
      },
      {
        name: "Base64 Encoder/Decoder",
        description: "Encode or decode Base64 strings instantly.",
        link: "/developer-tools/base64-encoder-decoder.html",
        icon: "🔐"
      }
    ]
  };

  /* ===============================
     DOM ELEMENTS
  =============================== */

  const categoryCards = document.querySelectorAll(".category-card");
  const categoryGrid = document.getElementById("categoryGrid");
  const toolsSection = document.getElementById("toolsSection");
  const toolsGrid = document.getElementById("toolsGrid");
  const toolsTitle = document.getElementById("toolsTitle");
  const backBtn = document.getElementById("backBtn");

  if (!categoryCards.length) {
    console.warn("No category cards found ❌");
    return;
  }

  /* ===============================
     CATEGORY CLICK EVENT
  =============================== */

  categoryCards.forEach(card => {
    card.addEventListener("click", function () {
      const category = card.getAttribute("data-category");

      if (!category || !toolsData[category]) {
        console.warn("Category not found:", category);
        return;
      }

      showTools(category);
    });
  });

  /* ===============================
     SHOW TOOLS FUNCTION
  =============================== */

  function showTools(category) {

    categoryGrid.classList.add("hidden");
    toolsSection.classList.remove("hidden");

    toolsTitle.innerText = category.charAt(0).toUpperCase() + category.slice(1) + " Tools";

    toolsGrid.innerHTML = "";

    toolsData[category].forEach(tool => {

      const toolCard = document.createElement("a");
      toolCard.href = tool.link;
      toolCard.className = "tool-link";

      toolCard.innerHTML = `
        <div class="tool-card">
          <div class="tool-icon">${tool.icon}</div>
          <h3>${tool.name}</h3>
          <p>${tool.description}</p>
        </div>
      `;

      toolsGrid.appendChild(toolCard);
    });

    window.scrollTo({
      top: toolsSection.offsetTop - 80,
      behavior: "smooth"
    });
  }

  /* ===============================
     BACK BUTTON
  =============================== */

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      toolsSection.classList.add("hidden");
      categoryGrid.classList.remove("hidden");

      window.scrollTo({
        top: categoryGrid.offsetTop - 80,
        behavior: "smooth"
      });
    });
  }

});