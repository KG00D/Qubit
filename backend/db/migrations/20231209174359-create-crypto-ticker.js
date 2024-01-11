"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cryptoTicker', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      count: {
        type: Sequelize.INTEGER
      },
      nextUrl: {
        type: Sequelize.STRING
      },
      requestId: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      cik: {
        type: Sequelize.STRING
      },
      compositeFigi: {
        type: Sequelize.STRING
      },
      currencyName: {
        type: Sequelize.STRING
      },
      lastUpdatedUtc: {
        type: Sequelize.DATE
      },
      locale: {
        type: Sequelize.STRING
      },
      market: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      primaryExchange: {
        type: Sequelize.STRING
      },
      shareClassFigi: {
        type: Sequelize.STRING
      },
      ticker: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cryptoTicker');
  }
};
