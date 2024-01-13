'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class debtHolding extends Model {
    static associate(models) {
        debtHolding.belongsTo(models.Account, { 
        foreignKey: 'accountId' });
      ;
    }
}

debtHolding.init({
    accountId: DataTypes.INTEGER,
    holdingName: DataTypes.STRING,
    balance: DataTypes.DECIMAL,
    interestRate: DataTypes.DECIMAL,
    term: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'debtHolding',
  });
  return debtHolding;
};
