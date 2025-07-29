// Toggle password visibility
function togglePassword(id) {
  const field = document.getElementById(id);
  field.type = field.type === "password" ? "text" : "password";
}
// Password strength checker
function checkStrength(password) {
  const meter = document.getElementById('strengthMeter').firstElementChild;
  if (!password) {
    meter.style.width = '0';
    return;
  }
  const strongRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/;
  const mediumRegex = /(?=.*[a-z])(?=.*\d).{6,}/;
  if (strongRegex.test(password)) {
    meter.className = 'strength-strong';
  } else if (mediumRegex.test(password)) {
    meter.className = 'strength-medium';
  } else {
    meter.className = 'strength-weak';
  }
}
// Handle login
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // You can replace this with API calls later
  alert(`Logged in as ${email}`);
});

// Handle signup
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
   const confirm = document.getElementById('confirmPassword').value;

  if (password !== confirm) {
    document.getElementById('confirmError').innerText = "Passwords do not match!";
    return;
  } else {
    document.getElementById('confirmError').innerText = "";
  }

  alert(`Signed up as ${name}`);
});

// Strength meter live update
document.getElementById('signupPassword')?.addEventListener('input', function (e) {
  checkStrength(e.target.value);
});

// Confirm password match check
document.getElementById('confirmPassword')?.addEventListener('input', function () {
  const password = document.getElementById('signupPassword').value;
  const confirm = this.value;
  const error = document.getElementById('confirmError');

  error.innerText = password !== confirm ? "Passwords do not match!" : "";
});


