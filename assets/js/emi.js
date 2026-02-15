document.getElementById("emiForm").addEventListener("submit", function(e){
  e.preventDefault();

  const loan = document.getElementById("loanAmount");
  const rate = document.getElementById("interestRate");
  const tenure = document.getElementById("loanTenure");

  const errors = document.querySelectorAll(".error");
  errors.forEach(err => err.textContent = "");

  let valid = true;

  if(loan.value <= 0){
    errors[0].textContent = "Please enter a valid loan amount.";
    valid = false;
  }

  if(rate.value <= 0){
    errors[1].textContent = "Interest rate must be greater than 0.";
    valid = false;
  }

  if(tenure.value <= 0){
    errors[2].textContent = "Loan tenure must be at least 1 year.";
    valid = false;
  }

  if(!valid) return;

  const P = parseFloat(loan.value);
  const R = parseFloat(rate.value) / 12 / 100;
  const N = parseFloat(tenure.value) * 12;

  const emi = (P * R * Math.pow(1+R,N)) / (Math.pow(1+R,N) - 1);
  const total = emi * N;
  const interest = total - P;

  document.getElementById("emiResult").textContent = "₹" + emi.toFixed(2);
  document.getElementById("totalInterest").textContent = "₹" + interest.toFixed(2);
  document.getElementById("totalPayment").textContent = "₹" + total.toFixed(2);

  document.getElementById("resultBox").style.display = "block";
});
