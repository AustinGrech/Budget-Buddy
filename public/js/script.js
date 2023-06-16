// Get DOM elements
// Get DOM elements
const incomeForm = document.querySelector("#income-input form");
const incomeAmountInput = document.querySelector("#income-amount");
const incomeFrequencySelect = document.querySelector("#income-frequency");
const incomeRemaining = document.querySelector("#income-remaining p");
const monthlyIncomeInput = document.querySelector("#monthly-income");
const expenseForm = document.querySelector("#expense-input form");
const expenseList = document.querySelector("#expense-list ul");
const debtForm = document.querySelector("#debt-input form");
const debtList = document.querySelector("#debt-list ul");
const debtPaymentElement = document.querySelector("#debt-payment p");
const provinceSelect = document.querySelector("#province");

let monthlyIncome = 0;
let expenses = [];
let debts = [];
let taxRate = 0; // Declare the taxRate variable

// Event listeners
incomeForm.addEventListener("submit", handleIncomeSubmit);
expenseForm.addEventListener("submit", handleExpenseSubmit);
debtForm.addEventListener("submit", handleDebtSubmit);

// Function to calculate the income after taxes
function calculateIncomeAfterTaxes(incomeAmount, taxRate) {
  const taxAmount = incomeAmount * taxRate;
  const incomeAfterTaxes = incomeAmount - taxAmount;
  return incomeAfterTaxes.toFixed(2);
}

// Function to handle income submission
// Function to handle income submission
function handleIncomeSubmit(event) {
  event.preventDefault();
  const selectedProvince = provinceSelect.value;
  console.log("Selected Province:", selectedProvince);

  // Make API request to get tax rates
  fetch(
    `https://gstrate-cra-arc.api.canada.ca:443/ebci/ghnf/api/ext/v1/rates?province=${selectedProvince}`,
    {
      headers: {
        "user-key": "71ec1637e93a3b328d5f3dbc7a9b4990",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const gstRateProvinceList = data.GstRateProvinceList;
      const selectedProvinceData = gstRateProvinceList.find(
        (province) => province.ProvinceCode === selectedProvince
      );

      if (selectedProvinceData) {
        const gstRateDatePairList = selectedProvinceData.GstRateDatePairList;
        const currentDate = new Date(); // Assuming current date
        const selectedGstRate = gstRateDatePairList.find((ratePair) => {
          const effectiveDate = new Date(ratePair.EffectiveDate);
          const expiryDate = ratePair.ExpiryDate
            ? new Date(ratePair.ExpiryDate)
            : null;
          return (
            effectiveDate <= currentDate &&
            (!expiryDate || currentDate <= expiryDate)
          );
        });

        if (selectedGstRate) {
          taxRate = selectedGstRate.GstRate; // Set the taxRate value
          console.log("Tax Rate:", taxRate);

          monthlyIncome = calculateIncomeAfterTaxes(
            parseFloat(incomeAmountInput.value),
            taxRate
          ); // Calculate the income after taxes

          console.log("Monthly Income (after taxes):", monthlyIncome);
          calculateIncomeRemaining(); // Update the income remaining with the new tax rate and income after taxes
        } else {
          console.log("No GST rate found for the selected province.");
        }
      } else {
        console.log("Province data not found in the API response.");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Function to calculate the monthly gross income based on frequency
function calculateMonthlyGrossIncome(incomeAmount, incomeFrequency) {
  let monthlyGrossIncome = 0;

  if (incomeFrequency === "monthly") {
    monthlyGrossIncome = incomeAmount;
  } else if (incomeFrequency === "biweekly") {
    monthlyGrossIncome = (incomeAmount * 26) / 12;
  } else if (incomeFrequency === "weekly") {
    monthlyGrossIncome = (incomeAmount * 52) / 12;
  }
  return monthlyGrossIncome;
}

// Function to handle expense submission
function handleExpenseSubmit(event) {
  event.preventDefault();
  const expenseDate = document.querySelector("#expense-date").value;
  const expenseAmount = parseFloat(
    document.querySelector("#expense-amount").value
  );
  const expenseCategory = document.querySelector("#expense-category").value;
  const expenseFrequency = document.querySelector(
    'input[name="expense-frequency"]:checked'
  ).value;

  let modifiedExpenseAmount = expenseAmount;
  if (expenseFrequency === "weekly") {
    modifiedExpenseAmount *= 4.3;
  }

  const expense = {
    date: expenseDate,
    amount: modifiedExpenseAmount,
    category: expenseCategory,
  };

  expenses.push(expense);
  renderExpense(expense);
  calculateIncomeRemaining();
  expenseForm.reset();
}

// Function to handle debt submission
function handleDebtSubmit(event) {
  event.preventDefault();
  const debtDescription = document.querySelector("#debt-description").value;
  const debtAmount = parseFloat(document.querySelector("#debt-amount").value);
  const payoffPeriod = parseInt(document.querySelector("#payoff-period").value);
  const paymentFrequency = document.querySelector(
    'input[name="payment-frequency"]:checked'
  ).value;

  const modifiedDebtAmount = adjustDebtAmount(debtAmount, paymentFrequency);
  const calculatedDebtPayment = calculateDebtPayment(
    modifiedDebtAmount,
    payoffPeriod
  );

  const debt = {
    description: debtDescription,
    amount: modifiedDebtAmount,
    payoffPeriod: payoffPeriod,
    paymentFrequency: paymentFrequency,
    debtPayment: calculatedDebtPayment,
  };

  debts.push(debt);
  renderDebt(debt);
  calculateIncomeRemaining();
  debtForm.reset();
}

// Function to adjust debt amount based on payment frequency
function adjustDebtAmount(debtAmount, paymentFrequency) {
  if (paymentFrequency === "weekly") {
    return debtAmount * 4.3;
  }
  return debtAmount;
}

// Function to calculate the debt payment required
function calculateDebtPayment(debtAmount, payoffPeriod) {
  const debtPayment = debtAmount / payoffPeriod;
  return Math.round(debtPayment * 100) / 100; // Round to two decimal places
}

// Function to calculate income remaining after deducting expenses and debt payment
function calculateIncomeRemaining() {
  const totalExpenses = calculateTotalExpenses();
  const totalDebtPayment = calculateTotalDebtPayment();

  const incomeRemainingAmount =
    monthlyIncome - totalExpenses - totalDebtPayment;
  incomeRemaining.textContent = incomeRemainingAmount;
  debtPaymentElement.textContent = totalDebtPayment;
}

// Function to calculate the total expenses
function calculateTotalExpenses() {
  let total = 0;
  for (const expense of expenses) {
    total += expense.amount;
  }
  return total;
}

// Function to calculate the total debt payment
function calculateTotalDebtPayment() {
  let total = 0;
  for (const debt of debts) {
    total += debt.debtPayment;
  }
  return total;
}

// Function to render an expense item
function renderExpense(expense) {
  const listItem = document.createElement("li");
  listItem.textContent = `${expense.category}: $${expense.amount} (${expense.date})`;
  expenseList.appendChild(listItem);
}

// Function to render a debt item
function renderDebt(debt) {
  const listItem = document.createElement("li");
  listItem.textContent = `${debt.description}: $${debt.amount} (${debt.paymentFrequency} - ${debt.payoffPeriod} payments of ${debt.debtPayment})`;
  debtList.appendChild(listItem);
}
