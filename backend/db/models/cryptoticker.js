'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CryptoTicker extends Model {
    static associate(models) {
    }
  };

  CryptoTicker.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    count: DataTypes.INTEGER,
    nextUrl: DataTypes.STRING,
    requestId: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    cik: DataTypes.STRING,
    compositeFigi: DataTypes.STRING,
    currencyName: DataTypes.STRING,
    lastUpdatedUtc: DataTypes.DATE,
    locale: DataTypes.STRING,
    market: DataTypes.STRING,
    name: DataTypes.STRING,
    primaryExchange: DataTypes.STRING,
    shareClassFigi: DataTypes.STRING,
    ticker: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CryptoTicker',
    timestamps: true 
  });

  return CryptoTicker;
};