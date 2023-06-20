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
    initial_expense_date: { // the server expects this exact key words put inot our models or it will not read
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
      references: {
        model: User, // Use the User model
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    tableName: "expenses",
    modelName: "Expense",
  }
);

module.exports = Expense;
