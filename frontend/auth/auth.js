// Signup Form Validation
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const terms = document.getElementById('terms').checked;

  const nameRegex = /^[A-Za-z ]+$/;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+]{8,}$/;

  if (!nameRegex.test(name)) {
    alert("Name should contain only letters.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("Password must be at least 8 characters and contain only letters, numbers, or special symbols.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!terms) {
    alert("You must accept the terms and conditions.");
    return;
  }

  // All validation passed
  alert(`Sign-up successful! Welcome, ${name}`);
});
