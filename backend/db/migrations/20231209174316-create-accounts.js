"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Accounts', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountBalance: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      currencyCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      manualFlag: {
        type: Sequelize.BOOLEAN,
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
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Accounts', options);
  }
};
