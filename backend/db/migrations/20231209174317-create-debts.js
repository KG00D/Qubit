"use strict";

let options = {};
options.tableName = 'Debts';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Debts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: { 
          model: 'Users', 
          key: 'id' },
      },
      debtName: {
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
      remainingPayments: {
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
    await queryInterface.dropTable('Debts');
  }
};

