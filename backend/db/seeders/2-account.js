'use strict';
const bcrypt = require("bcryptjs");

let options = {};
options.tableName = 'Accounts';


if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        name: 'Plaid 401k',
        subType: '401k',
        type: 'Retirement',
        accountBalance: 23631.9805
      }
    ], { exclude: ['id'] });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};