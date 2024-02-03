'use strict';
const bcrypt = require("bcryptjs");

let options = {};
options.tableName = 'accountTransactions';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'accountTransactions';
    await queryInterface.bulkInsert(options, [
    {
        holdingId: 1,
        accountId: 1,
        transactionType: 'Open',
        securityName: "AAPL",
        amount: 1453.0,
        date: new Date('2023-01-05'),
        transactionDescription: "Open position for AAPL",
        price: 330.12, 
        value: 3449.75, 
        quantity: 10.45, 
    },
    {
        holdingId: 1,
        accountId: 1,
        transactionType: 'Buy',
        securityName: "AAPL",
        amount: 1499.91, 
        date: new Date('2023-07-01'),
        fees: 9.99,
        transactionDescription: "Buy more AAPL shares",
        price: 333.12, 
        value: 4949.66, 
    },
    {
        holdingId: 1,
        accountId: 1,
        transactionType: 'Sell',
        securityName: "AAPL",
        amount: 1922.41, 
        date: new Date('2023-09-11'),
        fees: 9.99,
        transactionDescription: "Sell some AAPL shares",
        price: 295.76, 
        value: 3027.25, 
        quantity: -6.5, 
    },
    {
        holdingId: 1,
        accountId: 1,
        transactionType: 'Value Update',
        securityName: "AAPL",
        amount: null, 
        date: new Date('2023-09-30'),
        transactionDescription: "Value update for AAPL",
        price: null, 
        value: 1922.41, 
        quantity: null, 
    },
    {
        holdingId: 1,
        accountId: 1,
        transactionType: 'Dividend',
        securityName: "AAPL",
        amount: 54.34, 
        date: new Date('2023-10-30'),
        transactionDescription: "Dividend received from AAPL",
        price: null, 
        quantity: null,
    }
    ], { exclude: ['id'] });
},
down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('accountTransactions', null, {});
    }
};

