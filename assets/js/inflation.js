document.getElementById("inflationForm").addEventListener("submit", function(e){
  e.preventDefault();

  let amount = document.getElementById("amount");
  let rate = document.getElementById("rate");
  let years = document.getElementById("years");
  let resultBox = document.getElementById("resultBox");
  let result = document.getElementById("result");

  let valid = true;

  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  if(amount.value === "" || amount.value <= 0){
    amount.nextElementSibling.textContent = "Enter valid amount";
    valid = false;
  }

  if(rate.value === "" || rate.value < 0){
    rate.nextElementSibling.textContent = "Enter valid rate";
    valid = false;
  }

  if(years.value === "" || years.value <= 0){
    years.nextElementSibling.textContent = "Enter valid years";
    valid = false;
  }

  if(!valid) return;

  let futureValue = amount.value * Math.pow((1 + rate.value/100), years.value);

  // Format number with commas
  let formatted = futureValue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  result.textContent = "$ " + formatted;
  resultBox.style.display = "block";
});