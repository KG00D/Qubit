'use strict';
const bcrypt = require("bcryptjs");

console.log('Running the Holding Seeder')


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}
console.log('Running the Holding Seeder')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Holdings', [
      {
        id: 1,
        accountId: 1,
        holdingName: 'AAPL',
        currencyCode: 'USD',
        quantity: 15,
        averagePricePaid: 140.0,
        positionOpenDate: '12/1/2022',
        // updatedByTransactions: true
      },
      {
        id: 2,
        accountId: 1,
        holdingName: 'TSLA',
        currencyCode: 'USD',
        quantity: 5,
        averagePricePaid: 680.0,
        positionOpenDate: '12/1/2022',
        // updatedByTransactions: true
      }
    ], { exclude: ['id'] });
  }
  ,

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Holdings', null, {});
  }
};