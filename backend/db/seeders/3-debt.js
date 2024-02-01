'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        
    await queryInterface.bulkInsert('Debts', [
      {
        userId: 1,
        debtName: 'Capital One Credit Card',
        balance: 4567.45,
        interestRate: 28.99,
        term: null,
        remainingPayments: null
      },
       {
        userId: 1,
        debtName: 'CitiBank Credit Card',
        balance: '1024.45',
        interestRate: 15.99,
        term: null,
        remainingPayments: null
        },
        {
        userId: 1,
        debtName: 'Barclays Personal Loan',
        balance: '7564.23',
        interestRate: 13.99,
        term: 60,
        remainingPayments: 24
      }
    ], { exclude: ['id'] });
  }
  ,

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Debts', null, {});
  }
};