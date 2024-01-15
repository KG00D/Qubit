'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StocksDividends extends Model {
    static associate(models) {
      // define association here, if any
    }
  };

  StocksDividends.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nextUrl: DataTypes.STRING,
    cashAmount: DataTypes.FLOAT,
    declarationDate: DataTypes.DATEONLY,
    dividendType: DataTypes.STRING,
    exSividendSate: DataTypes.DATEONLY,
    frequency: DataTypes.INTEGER,
    paySate: DataTypes.DATEONLY,
    recordDate: DataTypes.DATEONLY,
    ticker: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StocksDividends',
    timestamps: true
  });

  return StocksDividends;
};
