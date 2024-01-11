"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('plaidTransactions', {
      accountId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Accounts',
          key: 'accountId'
        }
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      cancelTransactionId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      fees: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      investmentTransactionId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      isoCurrencyCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      securityId: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('plaidTransactions');
  }
};
