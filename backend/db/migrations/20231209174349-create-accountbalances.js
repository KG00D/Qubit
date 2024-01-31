"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('AccountBalances', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      accountId: {
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: { 
          model: 'Accounts', 
          key: 'id'}
      },
      accountBalance: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      balanceDate: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('AccountBalances', options);
  }
};
