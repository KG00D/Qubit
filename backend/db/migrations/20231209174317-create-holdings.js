"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Holdings', {
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
      currencyCode: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Holdings');
  }
};

