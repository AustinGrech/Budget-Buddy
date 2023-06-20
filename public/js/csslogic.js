const startButton = document.querySelector(".cta-button");
const signUpBtn = document;

// console.log(startButton);
startButton.addEventListener("mouseenter", (event) => {
  // event listner means activating the button // (event) => { running the event to take place for previous action   }
  // console.log('cliking a button');
  startButton.innerHTML = "$$$  Click here Now! $$$";
});

startButton.addEventListener("mouseout", (event) => {
  startButton.innerHTML = "$$$ Start Budgeting Now! $$$";
});

startButton.addEventListener("click", (event) => {
  window.location.href = "/signup"; // href is clicking a link directly to the handlebars you created.
});

// add an event listent to the budget page when they submit a budget a window prompts to display number of saves left
// save their number of clicks to local sotarge so it doesnt resest for futur use making the registration a must onward
// they have 0 left ask " Would you like to Register?"
// if they have 0 left they should not be able to proceed with any further budgeting plans
// homepage even listner 'onload' (event => {}) so that it starts as soon as they open our browser
// this should save and/or check for the number of budgets left
// make a new variable for each new html with effects that activate.
