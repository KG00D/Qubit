"use strict";

let options = {};
options.tableName = 'accountHoldings';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('accountHoldings', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { 
          model: 'Accounts', 
          key: 'id' 
        },
         onDelete: 'CASCADE'
      },
      securityName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      holdingName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      averagePricePaid: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      totalCost: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      positionOpenDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      currentValue: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('accountHoldings');
  }
};

