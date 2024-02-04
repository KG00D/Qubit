'use strict';
const { Model, DECIMAL, BOOLEAN } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class accountHolding extends Model {
    static associate(models) {
      accountHolding.belongsTo(models.Account, { 
        foreignKey: 'accountId' });
      accountHolding.hasMany(models.accountTransaction, { 
          foreignKey: 'holdingId',
          onDelete: 'CASCADE'
      });
    }
}

accountHolding.init({
    accountId: DataTypes.INTEGER,
    securityName: DataTypes.STRING,
    holdingName: DataTypes.STRING,
    quantity: DataTypes.DECIMAL,
    averagePricePaid: DataTypes.DECIMAL,
    totalCost: DataTypes.DECIMAL,
    positionOpenDate: DataTypes.DATE,
    currentValue: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'accountHolding',
  });
  return accountHolding;
};
