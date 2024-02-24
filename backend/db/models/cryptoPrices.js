'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CryptoPrice extends Model {
    static associate(models) {
    }
  }
  CryptoPrice.init({
    ticker: DataTypes.STRING,
    todaysChangePerc: DataTypes.FLOAT,
    todaysChange: DataTypes.FLOAT,
    updated: DataTypes.BIGINT,
    openingPrice: DataTypes.FLOAT,
    highPrice: DataTypes.FLOAT,
    lowPrice: DataTypes.FLOAT,
    closingPrice: DataTypes.FLOAT,
    volume: DataTypes.INTEGER,
    volumeWeighted: DataTypes.FLOAT,
    minVolume: DataTypes.INTEGER,
    minNumberOfTrades: DataTypes.INTEGER,
    minOpeningPrice: DataTypes.FLOAT,
    minHighPrice: DataTypes.FLOAT,
    minLowPrice: DataTypes.FLOAT,
    minClosingPrice: DataTypes.FLOAT,
    minVolumeWeighted: DataTypes.FLOAT,
    prevOpeningPrice: DataTypes.FLOAT,
    prevHighPrice: DataTypes.FLOAT,
    prevLowPrice: DataTypes.FLOAT,
    prevClosingPrice: DataTypes.FLOAT,
    prevVolume: DataTypes.INTEGER,
    prevVolumeWeighted: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'CryptoPrice',
  });
  return CryptoPrice;
};
