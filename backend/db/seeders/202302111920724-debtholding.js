'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('debtHoldings', [
      {
        id: 1,
        accountId: 2,
        holdingName: 'CitiBank One Personal Loan',
        balance: 15000,
        interestRate: 14.0,
        term: 60
      },
      {
        id: 2,
        accountId: 2,
        holdingName: 'Citi - Platinum',
        balance: 5000,
        interestRate: 14.0,
        term: null
      }
    ], { exclude: ['id'] });
  }
  ,

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('debtHoldings', null, {});
  }
};