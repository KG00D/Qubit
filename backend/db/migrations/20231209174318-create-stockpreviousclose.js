'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stockPreviousCloses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticker: {
        type: Sequelize.STRING,
        allowNull: false
      },
      close: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      high: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      low: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      open: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      timestamp: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      volume: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      volumeWeightedAveragePrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      adjusted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      closeDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
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

    await queryInterface.addIndex('stockPreviousCloses', ['ticker', 'closeDate'], {
      unique: true,
      fields: ['ticker', 'closeDate']
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stockPreviousCloses');
  }
};
