'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class StocksSplits extends Model {
    static associate(models) {
    }
  };

  StocksSplits.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nextUrl: DataTypes.STRING,
    executionDate: DataTypes.DATEONLY,
    splitFrom: DataTypes.INTEGER,
    splitTo: DataTypes.INTEGER,
    ticker: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StocksSplits',
    timestamps: true
  });

  return StocksSplits;
};
