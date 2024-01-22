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
                }
        },
      accountId: {
          type: Sequelize.INTEGER,
          allowNull: false,
              references: {
                model: 'Accounts',
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
          type: Sequelize.DATE,
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
      subType: {
          type: Sequelize.STRING,
          allowNull: true
      },
      type: {
          type: Sequelize.STRING,
          allowNull: false
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
    return queryInterface.dropTable('accountTransactions');
  }
};
