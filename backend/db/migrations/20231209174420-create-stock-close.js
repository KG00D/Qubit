"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stockClosing', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adjusted: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      queryCount: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      requestId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ticker: {
        type: Sequelize.STRING,
        allowNull: true
      },
      closePrice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      highPrice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      lowPrice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      openPrice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      timestampWindow: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      volume: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      volumeWeightedAveragePrice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      tickerTwo: {
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
    await queryInterface.dropTable('stockClosing');
  }
};
