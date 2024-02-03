"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('accountTransactions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      holdingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'accountHoldings',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Accounts',
          key: 'id'
        }
      },
      transactionType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      securityName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      transactionDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      value: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      fees: {
        type: Sequelize.DECIMAL,
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
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('accountTransactions');
  }
};
