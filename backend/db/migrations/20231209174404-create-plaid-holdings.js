"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('plaidHoldings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'Accounts', 
          key: 'id' 
        },
      },
      costBasis: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      institutionPrice: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      institutionPriceAsOf: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      institutionPriceDatetime: {
        type: Sequelize.STRING,
        allowNull: true
      },
      institutionValue: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      isoCurrencyCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      quantity: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      securityId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      unofficialCurrencyCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      manualFlag: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
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
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plaidHoldings');
  }
};

