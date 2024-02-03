'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Accounts';
    await queryInterface.bulkInsert('Accounts', [
      {
        userId: 1,
        name: 'Plaid 401k',
        subtype: '401k',
        type: 'investment',
        accountBalance: 23631.9805
      }
    ], { exclude: ['id'] });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};