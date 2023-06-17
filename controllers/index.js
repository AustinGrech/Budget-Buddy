const express = require("express");
const router = express.Router();

// Import your controllers here
const userController = require("./userController");
const expenseController = require("./expenseController");
const debtController = require("./debtController");

// Define your routes
router.use("/users", userController);
router.use("/expenses", expenseController);
router.use("/debts", debtController);
router.use("/user", userController);

module.exports = router;
