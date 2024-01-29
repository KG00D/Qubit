'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class stockPreviousClose extends Model {
    static associate(models) {
      stockPreviousClose.belongsTo(models.accountHolding, {
        foreignKey: 'holdingIdentifier',
        targetKey: 'holdingIdentifier'
      });
    }
  }

  stockPreviousClose.init({
    ticker: {
      type: DataTypes.STRING,
      allowNull: false
    },
    close: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    high: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    low: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    open: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    volume: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    volumeWeightedAveragePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    adjusted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    closeDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'stockPreviousClose',
    indexes: [{
      unique: true,
      fields: ['ticker', 'closeDate'] 
    }]  });
  return stockPreviousClose;
};

