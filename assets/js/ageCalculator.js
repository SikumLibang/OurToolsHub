function calculateAge() {
  const birthDate = new Date(document.getElementById("birthDate").value);
  const currentDateInput = document.getElementById("currentDate").value;
  const today = currentDateInput ? new Date(currentDateInput) : new Date();

  if (!birthDate || birthDate > today) {
    document.getElementById("ageResult").innerText =
      "Please enter valid dates.";
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById("ageResult").innerText =
    `${years} Years, ${months} Months, ${days} Days`;
}
