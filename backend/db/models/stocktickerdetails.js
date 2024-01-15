'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StocksTickerDetails extends Model {
    static associate(models) {
    }
  };

  StocksTickerDetails.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    requestId: { type: DataTypes.STRING, allowNull: false },
    active: DataTypes.BOOLEAN,
    address1: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    state: DataTypes.STRING,
    iconUrl: DataTypes.STRING,
    logoUrl: DataTypes.STRING,
    cik: DataTypes.STRING,
    compositeFigi: DataTypes.STRING,
    currencyName: DataTypes.STRING,
    description: DataTypes.TEXT,
    homepageUrl: DataTypes.STRING,
    listDate: DataTypes.DATEONLY,
    locale: DataTypes.STRING,
    market: DataTypes.STRING,
    marketCap: DataTypes.BIGINT,
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    primaryExchange: DataTypes.STRING,
    roundLot: DataTypes.INTEGER,
    shareClassFigi: DataTypes.STRING,
    shareClassSharesOutstanding: DataTypes.BIGINT,
    sicCode: DataTypes.STRING,
    sicDescription: DataTypes.STRING,
    ticker: DataTypes.STRING,
    tickerRoot: DataTypes.STRING,
    totalEmployees: DataTypes.INTEGER,
    type: DataTypes.STRING,
    weightedSharesOutstanding: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'StocksTickerDetails',
    timestamps: true
  });

  return StocksTickerDetails;
};