const express = require("express");
const router = express.Router();
const Expense = require("../../models/Expense");

// Route: POST /expenses
router.post("/expenses", async (req, res) => {
  try {
    const { description, amount } = req.body;
    const expense = await Expense.create({ description, amount });
    res.status(201).json(expense);
  } catch (error) {
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
    const { description, amount } = req.body;
    const expense = await Expense.findByPk(id);
    if (expense) {
      expense.description = description;
      expense.amount = amount;
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
