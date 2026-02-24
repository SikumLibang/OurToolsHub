const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // ALWAYS prevent first

  let isValid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");
  const termsCheck = document.getElementById("termsCheck");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  if (!name.value.trim()) {
    name.nextElementSibling.textContent = "Name is required";
    isValid = false;
  }

  if (!email.value.trim()) {
    email.nextElementSibling.textContent = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    email.nextElementSibling.textContent = "Enter a valid email address";
    isValid = false;
  }

  if (!subject.value.trim()) {
    subject.nextElementSibling.textContent = "Subject is required";
    isValid = false;
  }

  if (!message.value.trim()) {
    message.nextElementSibling.textContent = "Message is required";
    isValid = false;
  }

  if (!termsCheck.checked) {
    message.nextElementSibling.textContent = "You must accept Terms & Privacy.";
    isValid = false;
  }

//   if (!termsCheck.checked) {
//     alert("You must accept Terms & Privacy.");
//     isValid = false;
//   }

  if (isValid) {
    form.submit(); // ONLY submit if valid
  }
});