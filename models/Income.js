const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Income extends Model {}

Income.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // // DONT HAVE SOURCE YET, but I think it'd be cool if we could specify where we got the money from
    // source: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     isAlpha: true
    //   }
    // },

    paymentFrequency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    grossIncome: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "income",
  }
);

module.exports = Income;

// if any errors make sure to match iwth JSON file to connect
