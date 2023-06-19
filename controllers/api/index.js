const express = require("express");
const router = express.Router();

// Import your controllers here
const expenseController = require("./expenseController");
const debtController = require("./debtController");
const incomeController = require("./incomeController");
const userRoutes = require("./userRoutes");

// Define your routes
router.use("/expense", expenseController);
router.use("/debt", debtController);
router.use("/user", userRoutes);
router.use("/income", incomeController);

module.exports = router;
