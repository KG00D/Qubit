'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(options, [
      {
        accountId: 1,
        accountBalance: 100000.00,
        balanceDate: new Date('2022-12-31')
      },
      {
        accountId: 1,
        accountBalance: 110234.19,
        balanceDate: new Date('2023-01-01')
      },
      {
        accountId: 1,
        accountBalance: 113456.23,
        balanceDate: new Date('2023-02-01')
      },
      {
        accountId: 1,
        accountBalance: 116745.45,
        balanceDate: new Date('2023-03-01')
      },
      {
        accountId: 1,
        accountBalance: 119245.67,
        balanceDate: new Date('2023-04-01')
      },
      {
        accountId: 1,
        accountBalance: 122456.45,
        balanceDate: new Date('2023-05-01')
      },
      {
        accountId: 1,
        accountBalance: 124456.10,
        balanceDate: new Date('2023-06-01')
      },
      {
        accountId: 1,
        accountBalance: 129456.12,
        balanceDate: new Date('2023-07-01')
      },
      {
        accountId: 1,
        accountBalance: 130234.85,
        balanceDate: new Date('2023-08-01')
      },
      {
        accountId: 1,
        accountBalance: 134435.98,
        balanceDate: new Date('2023-09-01')
      },
      {
        accountId: 1,
        accountBalance: 135545.98,
        balanceDate: new Date('2023-10-01')
      },
      {
        accountId: 1,
        accountBalance: 125435.23,
        balanceDate: new Date('2023-11-01')
      },
      {
        accountId: 1,
        accountBalance: 123654.23,
        balanceDate: new Date('2023-12-31')
      },
      {
        accountId: 1,
        accountBalance: 120663.84,
        balanceDate: new Date('2023-04-18')
      },
      {
        accountId: 1,
        accountBalance: 123267.97,
        balanceDate: new Date('2023-05-04')
      },
      {
        accountId: 1,
        accountBalance: 128167.67,
        balanceDate: new Date('2023-06-21')
      },
      {
        accountId: 1,
        accountBalance: 130151.26,
        balanceDate: new Date('2023-07-25')
      },
      {
        accountId: 1,
        accountBalance: 130151.26,
        balanceDate: new Date('2023-07-25')
      },
      {
        accountId: 1,
        accountBalance: 124601.11,
        balanceDate: new Date('2023-11-29')
      }
    ], { exclude: ['id'] });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AccountBalances', null, {});
  }
};