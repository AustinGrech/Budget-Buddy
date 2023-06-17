const express = require("express");
const router = express.Router();
const Debt = require("../models/Debt");

// Route: POST /debts
router.post("/", async (req, res) => {
  try {
    const { description, amount } = req.body;
    const debt = await Debt.create({ description, amount });
    res.status(201).json(debt);
  } catch (error) {
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
    const { description, amount } = req.body;
    const debt = await Debt.findByPk(id);
    if (debt) {
      debt.description = description;
      debt.amount = amount;
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
