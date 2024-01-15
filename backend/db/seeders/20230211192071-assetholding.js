'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('assetHoldings', [
      {
        id: 1,
        accountId: 1,
        holdingName: 'Apple Stock',
        holdingIdentifier: 'AAPL',
        quantity: 15,
        averagePricePaid: 140.0,
        positionOpenDate: '12/1/2022',
        currency: 'USD'
      },
      {
        id: 2,
        accountId: 1,
        holdingName: 'Tesla',
        holdingIdentifier: 'TSLA',
        quantity: 5,
        averagePricePaid: 680.0,
        positionOpenDate: '12/1/2022',
        currency: 'USD'
      },
      {
        id: 3,
        accountId: 3,
        holdingName: 'Tesla',
        holdingIdentifier: 'TSLA',
        quantity: 5.0,
        averagePricePaid: 680.0,
        positionOpenDate: '12/1/2022',
        currency: 'USD'
      },
      {
        id: 4,
        accountId: 3,
        holdingName: 'PepeCoin',
        holdingIdentifier: 'PEPE',
        quantity: 50000.00,
        averagePricePaid: 0.00045,
        positionOpenDate: '12/1/2022',
        currency: 'USD'
      }
    ], { exclude: ['id'] });
  }
  ,

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('assetHoldings', null, {});
  }
};