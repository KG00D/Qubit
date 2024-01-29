'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ticker extends Model {
        static associate(models) {
        }
    }

    Ticker.init({
        active: DataTypes.BOOLEAN,
        cik: DataTypes.STRING,
        composite_figi: DataTypes.STRING,
        currency_name: DataTypes.STRING,
        last_updated_utc: DataTypes.DATE,
        locale: DataTypes.STRING,
        market: DataTypes.STRING,
        name: DataTypes.STRING,
        primary_exchange: DataTypes.STRING,
        share_class_figi: DataTypes.STRING,
        ticker: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Ticker',
        tableName: 'tickers',
        timestamps: false
    });
    return Ticker;
};
