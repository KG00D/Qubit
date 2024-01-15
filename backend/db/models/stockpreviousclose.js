'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StocksPreviousClose extends Model {
    static associate(models) {
    }
  };

  StocksPreviousClose.init({
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
    modelName: 'StocksPreviousClose',
    timestamps: true
  });

  return StocksPreviousClose;
};
