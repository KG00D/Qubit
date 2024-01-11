'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class plaidItem extends Model {
    static associate(models) {
      // associations can be defined here
      // Item.hasMany(models.Account, { foreignKey: 'itemId' });
    }
  }

  plaidItem.init({
    itemId: DataTypes.STRING,
    availableProducts: DataTypes.JSON,
    billedProducts: DataTypes.JSON,
    error: DataTypes.STRING,
    institutionId: DataTypes.STRING,
    updateType: DataTypes.STRING,
    webhook: DataTypes.STRING,
    consentExpirationTime: DataTypes.DATE,
    lastSuccessfulUpdate: DataTypes.DATE,
    lastFailedUpdate: DataTypes.DATE,
    lastWebhookSentAt: DataTypes.DATE,
    lastWebhookCodeSent: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'plaidItem',
  });

  return plaidItem;
};