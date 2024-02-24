'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StockPrices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticker: {
        type: Sequelize.STRING
      },
      todaysChangePerc: {
        type: Sequelize.FLOAT
      },
      todaysChange: {
        type: Sequelize.FLOAT
      },
      updated: {
        type: Sequelize.BIGINT
      },
      openingPrice: {
        type: Sequelize.FLOAT
      },
      highPrice: {
        type: Sequelize.FLOAT
      },
      lowPrice: {
        type: Sequelize.FLOAT
      },
      closingPrice: {
        type: Sequelize.FLOAT
      },
      volume: {
        type: Sequelize.INTEGER
      },
      volumeWeighted: {
        type: Sequelize.FLOAT
      },
      minVolume: {
        type: Sequelize.INTEGER
      },
      minNumberOfTrades: {
        type: Sequelize.INTEGER
      },
      minOpeningPrice: {
        type: Sequelize.FLOAT
      },
      minHighPrice: {
        type: Sequelize.FLOAT
      },
      minLowPrice: {
        type: Sequelize.FLOAT
      },
      minClosingPrice: {
        type: Sequelize.FLOAT
      },
      minVolumeWeighted: {
        type: Sequelize.FLOAT
      },
      prevOpeningPrice: {
        type: Sequelize.FLOAT
      },
      prevHighPrice: {
        type: Sequelize.FLOAT
      },
      prevLowPrice: {
        type: Sequelize.FLOAT
      },
      prevClosingPrice: {
        type: Sequelize.FLOAT
      },
      prevVolume: {
        type: Sequelize.INTEGER
      },
      prevVolumeWeighted: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StockPrices');
  }
};
