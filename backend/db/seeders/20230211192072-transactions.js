'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}
console.log('Running the Trans Seeder')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Transactions', [
        {
            accountId: 1,
            holdingId: 1,
            securityName: "AAPL",
            holdingName: null,
            amount: 1453.0,
            date: "2023-01-05",
            fees: 0,
            transactionDescription: "BUY APPLE",
            price: 330.12,
            quantity: 3.45,
            subtype: "buy",
            type: "buy",
            currencyCode: "USD"
        },
        {
            accountId: 1,
            holdingId: 1,
            amount: 342.69,
            securityName: "AAPL",
            holdingName: null,
            date: "2023-07-01",
            fees: 1.0,
            transactionDescription: "BUY APPLE",
            price: 333.12,
            quantity: 4.5,
            subtype: "buy",
            type: "buy",
            currencyCode: "USD"
        },
        {
            accountId: 1,
            holdingId: 1,
            securityName: "AAPL",
            holdingName: null,
            amount: -377.56,
            date: "2023-09-11",
            fees: 1.72,
            transactionDescription: "SELL APPLE",
            price: 295.76,
            quantity: 6.5,
            subtype: "sell",
            type: "sell",
            currencyCode: "USD"
        },
        {
            accountId: 1,
            holdingId: 2,
            securityName: "TSLA",
            holdingName: null,
            amount: -210.29,
            date: "2023-02-08",
            fees: 7.52,
            transactionDescription: "BUY TESLA",
            price: 287.38,
            quantity: 3,
            subtype: "buy",
            type: "buy",
            currencyCode: "USD"
        },
        {
            accountId: 1,
            holdingId: 2,
            securityName: "TSLA",
            holdingName: null,
            amount: -748.08,
            date: "2023-03-07",
            fees: 0,
            transactionDescription: "BUY TESLA",
            price: 290.95,
            quantity: 1,
            subtype: "buy",
            type: "buy",
            currencyCode: "USD"
        },
        {
            accountId: 1,
            holdingId: 2,
            securityName: "TSLA",
            holdingName: null,
            amount: 695.42,
            date: "2023-11-15",
            fees: 0.34,
            transactionDescription: "SELL TESLA",
            price: 280.75,
            quantity: 2,
            subtype: "sell",
            type: "sell",
            currencyCode: "USD"
        }
    ], { exclude: ['id'] });
},
down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {});
    }
};

