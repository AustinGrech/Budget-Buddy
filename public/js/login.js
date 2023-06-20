// Event handler for login form
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, change the text and ID of the login button
      const loginButtons = document.querySelectorAll(".login-button");
      loginButtons.forEach((button) => {
        button.textContent = "Logout";
        button.id = "logout";
      });
      // If successful, redirect the browser to the expenses page
      document.location.replace("/expenses");
    } else {
      alert(response.statusText);
    }
  }
};

// Event handler for signup form
const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (email && password) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  }
};

// Event listener for login form
const loginForm = document.querySelector(".login-form");
if (loginForm) {
  loginForm.addEventListener("submit", loginFormHandler);
}

// Event listener for signup form
const signupForm = document.querySelector(".signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", signupFormHandler);
}
