'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Debt extends Model {
       static associate(models) {
      Debt.belongsTo(models.User, {foreignKey: 'userId'});  
      }
    }

Debt.init({
    userId: DataTypes.INTEGER,
    debtName: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    interestRate: DataTypes.DECIMAL,
    term: DataTypes.INTEGER,
    remainingPayments: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Debt',
  });
  return Debt;
};
