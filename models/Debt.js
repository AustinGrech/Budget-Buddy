const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");

class Debt extends Model {}
Debt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    debt_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    payoff_period: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    payment_debt_frequency: {
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
    tableName: "debt",
    modelName: "Debt",
  }
);
module.exports = Debt;
