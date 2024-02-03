'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'accountHoldings';
    await queryInterface.bulkInsert(options, [
      {
        accountId: 1,
        securityName: 'AAPL',
        holdingName: 'Apple Stock',
        quantity: 15,
        averagePricePaid: 140.0,
        positionOpenDate: new Date('2023-01-05'),
        currentValue: 2100.00
      }
    ], { exclude: ['id'] });
  }
  ,

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('accountHoldings', null, {});
  }
};