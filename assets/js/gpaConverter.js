const convertBtn = document.getElementById("convertBtn");
const gpaInput = document.getElementById("gpaInput");
const scaleSelect = document.getElementById("scaleSelect");
const resultBox = document.getElementById("resultBox");
const resultValue = document.getElementById("resultValue");

convertBtn.addEventListener("click", function () {

  let isValid = true;

  const gpa = parseFloat(gpaInput.value);
  const scale = parseFloat(scaleSelect.value);

  document.getElementById("gpaError").textContent = "";
  document.getElementById("scaleError").textContent = "";

  if (isNaN(gpa) || gpa <= 0) {
    document.getElementById("gpaError").textContent = "Enter a valid GPA.";
    isValid = false;
  }

  if (!scale) {
    document.getElementById("scaleError").textContent = "Select GPA scale.";
    isValid = false;
  }

  if (isValid) {

    if (gpa > scale) {
      document.getElementById("gpaError").textContent = `GPA cannot exceed ${scale}.`;
      return;
    }

    const percentage = ((gpa / scale) * 100).toFixed(2);

    resultValue.textContent = percentage + "%";
    resultBox.style.display = "block";

    resultBox.scrollIntoView({ behavior: "smooth" });
  }
});