"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stockTicker', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      nextUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      requestId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      cik: {
        type: Sequelize.STRING,
        allowNull: true
      },
      compositeFigi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currencyName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastUpdatedUtc: {
        type: Sequelize.DATE,
        allowNull: true
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: true
      },
      market: {
        type: Sequelize.STRING,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      primaryExchange: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shareClassFigi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ticker: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('stockTicker');
  }
};
