"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('plaidAccounts', {
      accountId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: { model: 'plaidHoldings', key: 'accountId' },
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: { model: 'Users', key: 'id' },
      },
      itemId: {
        allowNull: true,
        type: Sequelize.STRING, 
        references: { model: 'Items', key: 'id' },
      },
      mask: {
        type: Sequelize.STRING,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      officialName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      subtype: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      availableBalance: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      currentBalance: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      isoCurrencyCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      limit: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      unofficialCurrencyCode: {
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
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plaidAccounts', options);
  }
};
