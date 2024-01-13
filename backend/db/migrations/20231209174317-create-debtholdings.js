"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('debtHoldings', {
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
      },
      holdingName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      interestRate: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      term: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('debtHoldings');
  }
};

