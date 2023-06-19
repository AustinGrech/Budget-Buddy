const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");

class Expense extends Model {}
Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    initial_expense_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_frequency: {
      type: DataTypes.ENUM("monthly", "weekly"),
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Expense",
    tableName: "expenses",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Expense;
