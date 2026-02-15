let currentUnit = "metric";

/* ================= UNIT TOGGLE ================= */

document.getElementById("metricBtn").addEventListener("click", () => {
  currentUnit = "metric";
  document.getElementById("metricBtn").classList.add("active");
  document.getElementById("imperialBtn").classList.remove("active");
  document.getElementById("weightLabel").innerText = "Weight (kg)";
  document.getElementById("heightLabel").innerText = "Height (cm)";
  resetBMI();
});

document.getElementById("imperialBtn").addEventListener("click", () => {
  currentUnit = "imperial";
  document.getElementById("imperialBtn").classList.add("active");
  document.getElementById("metricBtn").classList.remove("active");
  document.getElementById("weightLabel").innerText = "Weight (lbs)";
  document.getElementById("heightLabel").innerText = "Height (in)";
  resetBMI();
});

/* ================= BMI CALCULATION ================= */

function calculateBMI() {
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");
  const weightError = document.getElementById("weightError");
  const heightError = document.getElementById("heightError");
  const resultSection = document.getElementById("resultSection");
  const bmiValue = document.getElementById("bmiValue");
  const bmiCategory = document.getElementById("bmiCategory");
  const bmiIndicator = document.getElementById("bmiIndicator");

  let weight = parseFloat(weightInput.value);
  let height = parseFloat(heightInput.value);
  let hasError = false;

  // Reset errors
  weightError.innerText = "";
  heightError.innerText = "";

  if (!weight || weight <= 0) {
    weightError.innerText = "Please enter a valid weight";
    hasError = true;
  }

  if (!height || height <= 0) {
    heightError.innerText = "Please enter a valid height";
    hasError = true;
  }

  if (hasError) return;

  // Convert height properly
  if (currentUnit === "metric") {
    height = height / 100; // cm → meters
  }

  let bmi;

  if (currentUnit === "metric") {
    bmi = weight / (height * height);
  } else {
    bmi = (weight / (height * height)) * 703;
  }

  bmi = parseFloat(bmi.toFixed(1));

  /* ================= CATEGORY ================= */

  let category = "";
  let position = 0;

  if (bmi < 18.5) {
    category = "Underweight";
    position = 15;
  } else if (bmi < 25) {
    category = "Normal weight";
    position = 35;
  } else if (bmi < 30) {
    category = "Overweight";
    position = 65;
  } else {
    category = "Obese";
    position = 90;
  }

  /* ================= SHOW RESULT WITH ANIMATION ================= */

  resultSection.classList.remove("hidden");

  // Force reflow for animation
  void resultSection.offsetWidth;

  resultSection.classList.add("show");

  // Animate number
  animateValue(bmiValue, 0, bmi, 800);

  // Show category smoothly
  bmiCategory.textContent = category;
  bmiCategory.classList.remove("show");
  setTimeout(() => {
    bmiCategory.classList.add("show");
  }, 300);

  // Move indicator smoothly
  bmiIndicator.style.left = position + "%";
}

/* ================= NUMBER ANIMATION ================= */

function animateValue(element, start, end, duration) {
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    element.textContent = (progress * (end - start) + start).toFixed(1);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/* ================= RESET ================= */

function resetBMI() {
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("weightError").innerText = "";
  document.getElementById("heightError").innerText = "";

  const resultSection = document.getElementById("resultSection");
  resultSection.classList.remove("show");
  resultSection.classList.add("hidden");

  document.getElementById("bmiIndicator").style.left = "0%";
  document.getElementById("bmiValue").textContent = "";
  document.getElementById("bmiCategory").textContent = "";
}
