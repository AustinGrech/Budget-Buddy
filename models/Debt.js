const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Debt extends Model {}

Debt.init(
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
        isAlpha: true
      }
    },
    debtAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      }, 
      payoffPeriod:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
          }
      },
    paymentFrequency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    }, 
    userId: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'user', 
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'debt',
  }
);

module.exports = Debt;
