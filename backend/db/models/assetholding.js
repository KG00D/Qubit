'use strict';
const { Model, DECIMAL, BOOLEAN } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class assetHolding extends Model {
    static associate(models) {
      assetHolding.belongsTo(models.Account, { 
        foreignKey: 'accountId' });
        assetHolding.hasMany(models.assetTransaction, { 
        foreignKey: 'holdingId'
      });
    }
}

assetHolding.init({
    accountId: DataTypes.INTEGER,
    holdingName: DataTypes.STRING,
    holdingIdentifier: DataTypes.STRING,
    quantity: DataTypes.DECIMAL,
    averagePricePaid: DataTypes.DECIMAL,
    positionOpenDate: DataTypes.DATE,
    currency: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'assetHolding',
  });
  return assetHolding;
};
