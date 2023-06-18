const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Income = require("../../models/Income");
const Expense = require("../../models/Expense");
const Debt = require("../../models/Debt");

// Create new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User signup
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res.status(400).json({ message: "Unable to log in. Please try again." });
      return;
    }

    const validatePassword = await userData.checkPassword(req.body.password);

    if (!validatePassword) {
      res.status(400).json({ message: "Unable to log in. Please try again." });
      return;
    }

    const userIncome = await Income.findAll({
      where: {
        user_id: userData.id,
      },
    });

    const userExpenses = await Expense.findAll({
      where: {
        user_id: userData.id,
      },
    });

    const userDebts = await Debt.findAll({
      where: {
        user_id: userData.id,
      },
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({
        user: userData,
        income: userIncome,
        expenses: userExpenses,
        debts: userDebts,
        message: "You are logged in!",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// User logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in === true) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
