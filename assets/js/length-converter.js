const convertBtn = document.getElementById("convertBtn");
const inputValue = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const resultOutput = document.getElementById("resultOutput");

const toMeter = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  inch: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mile: 1609.34
};

convertBtn.addEventListener("click", () => {
  const value = parseFloat(inputValue.value);
  if (isNaN(value)) {
    resultOutput.textContent = "Enter valid number";
    return;
  }

  const meters = value * toMeter[fromUnit.value];
  const result = meters / toMeter[toUnit.value];

  resultOutput.textContent = result.toFixed(6);
});