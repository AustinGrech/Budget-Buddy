const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

// // Handler function for tech talk login form submission
// const TechTalkLoginFormHandler = async (event) => {
//   event.preventDefault();
//   // Get the values of the username and password input fields
//   const username = document
//     .querySelector("#username-tech-talk-login")
//     .value.trim();
//   const password = document
//     .querySelector("#password-tech-talk-login")
//     .value.trim();
//   // If the input fields have values
//   if (username && password) {
//     // Send a POST request to the login endpoint with the input values as JSON data
//     const response = await fetch("/api/users/login", {
//       method: "POST",
//       body: JSON.stringify({ username, password }),
//       headers: { "Content-Type": "application/json" },
//     });
//     // If the request was successful, redirect to the homepage
//     if (response.ok) {
//       document.location.replace("/"); // When successful, load the homepage
//     } else {
//       // If the request was unsuccessful, show an alert
//       alert("Failed to log in."); // When unsuccessful, show alert
//     }
//   }
// };

// // Event listener for the tech talk login form
// const techTalkLoginForm = document.querySelector(".tech-talk-login-form");
// if (techTalkLoginForm) {
//   techTalkLoginForm.addEventListener("submit", techTalkLoginFormHandler);
// }
