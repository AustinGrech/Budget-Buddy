const sequelize = require("./config/connection");
const { User, Income, Expense, Debt } = require("./models");

const userData = require("./seeds/userData.json");
const incomeData = require("./seeds/incomeData.json");
const expenseData = require("./seeds/expenseData.json");
const debtData = require("./seeds/debtData.json");

const seedEm = async () => {
  await sequelize.sync();
  console.log("\n----- DATABASE SYNCED -----\n");

  await User.bulkCreate(userData);
  console.log("\n----- USER SEEDED -----\n");

  await Income.bulkCreate(incomeData);
  console.log("\n----- INCOME SEEDED -----\n");

  await Expense.bulkCreate(expenseData);
  console.log("\n----- EXPENSE SEEDED -----\n");

  await Debt.bulkCreate(debtData);
  console.log("\n----- DEBT SEEDED -----\n");
};

seedEm();
