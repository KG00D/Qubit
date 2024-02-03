"use strict";

let options = {};
options.tableName = 'accountHoldings';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
  console.log('Migration options Account Holdings:', options);
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
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      averagePricePaid: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      positionOpenDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      currentValue: {
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
    await queryInterface.dropTable('accountHoldings');
  }
};

