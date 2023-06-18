const express = require("express");
const router = express.Router();
const Income = require("../../models/Income");

router.post("/", async (req, res) => {
  try {
    const { paymentFrequency, grossIncome, province } = req.body;
    const newIncome = await Income.create({
      paymentFrequency,
      grossIncome,
      province,
      user_id: req.session.user_id, // Assuming you have user_id stored in the session
    });
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(500).json({ error: "Failed to create income" });
  }
});
// Route: GET /incomes/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findByPk(id);
    if (income) {
      res.json(income);
    } else {
      res.status(404).json({ error: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get income" });
  }
});

// Route: PUT /incomes/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentFrequency, grossIncome, province } = req.body;
    const income = await Income.findByPk(id);
    if (income) {
      income.paymentFrequency = paymentFrequency;
      income.grossIncome = grossIncome;
      income.province = province;
      await income.save();
      res.json(income);
    } else {
      res.status(404).json({ error: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update income" });
  }
});

// Route: DELETE /incomes/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findByPk(id);
    if (income) {
      await income.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: "Income not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete income" });
  }
});

module.exports = router;
