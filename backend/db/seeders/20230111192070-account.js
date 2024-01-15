'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}
console.log('Running the Account Seeder')


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Accounts', [
      {
        id: 1,
        userId: 1,
        name: 'Plaid 401k',
        subtype: '401k',
        type: 'investment',
        accountBalance: 23631.9805,
        manualFlag: true
      },
      {
        id: 2,
        userId: 1,
        name: 'CitiBank',
        subtype: null,
        type: 'Banking',
        accountBalance: 23631.9805,
        manualFlag: true
      },
      {
        id: 3,
        userId: 2,
        name: 'Fidelity',
        subtype: null,
        type: 'Brokerage',
        accountBalance: 23631.9805,
        manualFlag: true
      }
    ], { exclude: ['id'] });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};