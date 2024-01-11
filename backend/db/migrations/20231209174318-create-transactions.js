"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
          },
      accountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
              references: {
                model: 'Accounts',
                key: 'id'
              }
          },
      holdingId: {
          type: Sequelize.INTEGER,
          allowNull: false,
              references: {
                model: 'Holdings',
                key: 'id'
              }
      },
    securityName: {
        type: Sequelize.STRING,
        allowNull: true
    },
      holdingName: {
          type: Sequelize.STRING,
          allowNull: true
      },
      amount: {
          type: Sequelize.DECIMAL,
          allowNull: false
      },
      date: {
          type: Sequelize.DATEONLY,
          allowNull: false
      },
      fees: {
          type: Sequelize.DECIMAL,
          allowNull: true
      },
      transactionDescription: {
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
      subtype: {
          type: Sequelize.STRING,
          allowNull: true
      },
      type: {
          type: Sequelize.STRING,
          allowNull: false
      },
      currencyCode: {
          type: Sequelize.STRING,
          allowNull: true
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
    return queryInterface.dropTable('Transactions');
  }
};
