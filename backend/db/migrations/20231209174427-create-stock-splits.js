"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stocksplits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nextUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      executionDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      splitFrom: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      splitTo: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ticker: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stocksplits');
  }
};
