const express = require("express");
const router = express.Router();
const Expense = require("../../models/Expense");

// Route: POST /api/expenses
router.post("/", async (req, res) => {
  try {
    const { category, amount, initialExpenseDate, paymentFrequency } = req.body;

   const payment_frequency = paymentFrequency
const initial_expense_date = initialExpenseDate

    console.log(category, amount, initialExpenseDate, paymentFrequency )
    const newExpense = await Expense.create({
      category,
      amount,
      initial_expense_date,
      payment_frequency,

      // Additional properties related to the user or any other necessary fields
    });
    res.status(201).json(newExpense);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create expense" });
  }
});

// Route: GET /expenses/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ error: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get expense" });
  }
});

// Route: PUT /expenses/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, initialExpenseDate, paymentFrequency } = req.body;
    const expense = await Expense.findByPk(id);
    if (expense) {
      expense.category = category;
      expense.amount = amount;
      expense.initialExpenseDate = initialExpenseDate;
      expense.paymentFrequency = paymentFrequency;
      await expense.save();
      res.json(expense);
    } else {
      res.status(404).json({ error: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// Route: DELETE /expenses/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    if (expense) {
      await expense.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;
