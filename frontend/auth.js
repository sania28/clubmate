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
  const name = document.getElementById('name').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  alert(`Signed up as ${name}`);
});
