'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CryptoPreviousClose extends Model {
    static associate(models) {
    }
  };

  CryptoPreviousClose.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    adjusted: DataTypes.BOOLEAN,
    queryCount: DataTypes.INTEGER,
    requestId: DataTypes.STRING,
    ticker: DataTypes.STRING,
    closePrice: DataTypes.FLOAT,
    highPrice: DataTypes.FLOAT,
    lowPrice: DataTypes.FLOAT,
    openPrice: DataTypes.FLOAT,
    timestampWindow: DataTypes.BIGINT,
    volume: DataTypes.BIGINT,
    volumeWeightedAveragePrice: DataTypes.FLOAT,
    tickerTwo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CryptoPreviousClose',
    timestamps: true
  });

  return CryptoPreviousClose;
};
