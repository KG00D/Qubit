'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('accountTransactions', [
        {
            holdingId: 1,
            accountId: 1,
            securityName: "AAPL",
            holdingName: null,
            amount: 1453.0,
            date: "2023-01-05",
            fees: 0,
            transactionDescription: "BUY APPLE",
            price: 330.12,
            quantity: 3.45,
            subType: "buy",
            type: "buy"
        },
        {
            holdingId: 1,
            accountId: 1,
            amount: 342.69,
            securityName: "AAPL",
            holdingName: null,
            date: "2023-07-01",
            fees: 1.0,
            transactionDescription: "BUY APPLE",
            price: 333.12,
            quantity: 4.5,
            subType: "buy",
            type: "buy"
        },
        {
            holdingId: 1,
            accountId: 1,
            securityName: "AAPL",
            holdingName: null,
            amount: -377.56,
            date: "2023-09-11",
            fees: 1.72,
            transactionDescription: "SELL APPLE",
            price: 295.76,
            quantity: 6.5,
            subType: "sell",
            type: "sell"
        },
        {
            holdingId: 1,
            accountId: 1,
            securityName: "TSLA",
            holdingName: null,
            amount: -210.29,
            date: "2023-02-08",
            fees: 7.52,
            transactionDescription: "BUY TESLA",
            price: 287.38,
            quantity: 3,
            subType: "buy",
            type: "buy"
        },
        {
            holdingId: 1,
            accountId: 1,
            securityName: "TSLA",
            holdingName: null,
            amount: -748.08,
            date: "2023-03-07",
            fees: 0,
            transactionDescription: "BUY TESLA",
            price: 290.95,
            quantity: 1,
            subType: "buy",
            type: "buy"
        },
        {
            holdingId: 1,
            accountId: 1,
            securityName: "TSLA",
            holdingName: null,
            amount: 695.42,
            date: "2023-11-15",
            fees: 0.34,
            transactionDescription: "SELL TESLA",
            price: 280.75,
            quantity: 2,
            subType: "sell",
            type: "sell"
        },
        {
            holdingId: 3,
            accountId: 3,
            securityName: "PEPE COIN",
            holdingName: null,
            amount: 0.00045,
            date: "2023-11-15",
            fees: 0.34,
            transactionDescription: "BUY PEPE",
            price: 0.00045,
            quantity: 593298483923924398,
            subType: "sell",
            type: "sell"
        }
    ], { exclude: ['id'] });
},
down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('accountTransactions', null, {});
    }
};

