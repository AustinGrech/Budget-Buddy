// Listen for income form submission
incomeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const paymentFrequency = document.getElementById("income-frequency").value;
  const province = document.getElementById("province").value;
  const grossIncome = parseFloat(
    document.getElementById("income-amount").value
  );

  const incomeData = {
    paymentFrequency,
    grossIncome,
    province,
  };

  try {
    const response = await fetch("/api/income", {
      // Updated endpoint to "/api/income"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(incomeData),
    });

    if (response.ok) {
      const newIncome = await response.json();
      console.log("New income created:", newIncome);
      // Perform any necessary UI updates or redirect to a new page
    } else {
      console.log("Failed to create income:", response.statusText);
      // Perform error handling or show an error message to the user
    }
  } catch (error) {
    console.log("Error creating income:", error);
    // Perform error handling or show an error message to the user
  }
});

// Listen for expense form submission
expenseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const category = document.getElementById("expense-category").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const initialExpenseDate = document.getElementById("expense-date").value;
  const paymentFrequency = document.querySelector(
    'input[name="expense-frequency"]:checked'
  ).value;

  const expenseData = {
    category,
    amount,
    initialExpenseDate,
    paymentFrequency,
  };

  try {
    const response = await fetch("/api/expenses", {
      // Updated endpoint to "/api/expenses"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    });

    if (response.ok) {
      const newExpense = await response.json();
      console.log("New expense created:", newExpense);
      // Perform any necessary UI updates or redirect to a new page
    } else {
      console.log("Failed to create expense:", response.statusText);
      // Perform error handling or show an error message to the user
    }
  } catch (error) {
    console.log("Error creating expense:", error);
    // Perform error handling or show an error message to the user
  }
});

// Listen for debt form submission
debtForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = document.getElementById("debt-description").value;
  const debtAmount = parseINT(document.getElementById("debt-amount").value);
  const payoffPeriod = document.getElementById("payoff-period").value;
  const paymentFrequency = document.querySelector(
    'input[name="payment-frequency"]:checked'
  ).value;

  const debtData = {
    description,
    debtAmount,
    payoffPeriod,
    paymentFrequency,
  };

  try {
    const response = await fetch("/api/debts", {
      // Updated endpoint to "/api/debts"
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(debtData),
    });

    if (response.ok) {
      const newDebt = await response.json();
      console.log("New debt created:", newDebt);
      // Perform any necessary UI updates or redirect to a new page
    } else {
      console.log("Failed to create debt:", response.statusText);
      // Perform error handling or show an error message to the user
    }
  } catch (error) {
    console.log("Error creating debt:", error);
    // Perform error handling or show an error message to the user
  }
});
