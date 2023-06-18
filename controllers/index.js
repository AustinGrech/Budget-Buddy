const express = require("express");
const router = express.Router();

// Import your controllers here
const userController = require("./userController");
const expenseController = require("./expenseController");
const debtController = require("./debtController");
const userRoutes = require("./api/userRoutes");

// Define your routes
router.use("/users", userController);
router.use("/expenses", expenseController);
router.use("/debts", debtController);
router.use("/user", userController);
router.use("/user", userRoutes);

module.exports = router;
