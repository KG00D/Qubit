'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exchangeTickers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        },
      active: {
        type: Sequelize.BOOLEAN
      },
      cik: {
        type: Sequelize.STRING
      },
      composite_figi: {
        type: Sequelize.STRING
      },
      currency_name: {
        type: Sequelize.STRING
      },
      last_updated_utc: {
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
      primary_exchange: {
        type: Sequelize.STRING
      },
      share_class_figi: {
        type: Sequelize.STRING
      },
      ticker: {
        type: Sequelize.STRING,
        primaryKey: true
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

    await queryInterface.addIndex('exchangeTickers', ['ticker', 'closeDate'], {
      unique: true,
      fields: ['ticker', 'closeDate']
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exchangeTickers');
  }
};
