"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cryptoClosing', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      adjusted: {
        type: Sequelize.BOOLEAN
      },
      queryCount: {
        type: Sequelize.INTEGER
      },
      requestId: {
        type: Sequelize.STRING
      },
      ticker: {
        type: Sequelize.STRING
      },
      closePrice: {
        type: Sequelize.FLOAT
      },
      highPrice: {
        type: Sequelize.FLOAT
      },
      lowPrice: {
        type: Sequelize.FLOAT
      },
      openPrice: {
        type: Sequelize.FLOAT
      },
      timestampWindow: {
        type: Sequelize.BIGINT
      },
      volume: {
        type: Sequelize.BIGINT
      },
      volumeWeightedAveragePrice: {
        type: Sequelize.FLOAT
      },
      tickerTwo: {
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
    await queryInterface.dropTable('cryptoClosing');
  }
};
