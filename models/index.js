const User = require("./User");
const Income = require("./Income");
const Expense = require("./Expense");
const Debt = require("./Debt");

User.hasMany(Income, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Expense, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Debt, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Income.belongsTo(User, {
  foreignKey: "user_id",
});

Expense.belongsTo(User, {
  foreignKey: "user_id",
});

Debt.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Income, Expense, Debt };
