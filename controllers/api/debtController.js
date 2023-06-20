const express = require("express");
const router = express.Router();
const Debt = require("../../models/Debt");

// Route: POST /api/debts
router.post("/", async (req, res) => {
  try {
    const { description, debtAmount, payoffPeriod, paymentDebtFrequency } = req.body;
    const debt_amount = debtAmount
    const payoff_period = payoffPeriod
    const payment_debt_frequency = paymentDebtFrequency // this is a quick fix, the real fix is to change the words being sent to the backend to match the model correctly
    const newDebt = await Debt.create({
      description,
      debt_amount,
      payoff_period,
      payment_debt_frequency,

      // Additional properties related to the user or any other necessary fields
    });
    res.status(201).json(newDebt);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create debt" });
  }
});
// Route: GET /debts/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const debt = await Debt.findByPk(id);
    if (debt) {
      res.json(debt);
    } else {
      res.status(404).json({ error: "Debt not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get debt" });
  }
});

// Route: PUT /debts/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, debtAmount, payoffPeriod, paymentDebtFrequency } =
      req.body;
    const debt = await Debt.findByPk(id);
    if (debt) {
      debt.description = description;
      debt.debtAmount = debtAmount;
      debt.payoffPeriod = payoffPeriod;
      debt.paymentDebtFrequency = paymentDebtFrequency;
      await debt.save();
      res.json(debt);
    } else {
      res.status(404).json({ error: "Debt not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update debt" });
  }
});

// Route: DELETE /debts/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const debt = await Debt.findByPk(id);
    if (debt) {
      await debt.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Debt not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete debt" });
  }
});

module.exports = router;
