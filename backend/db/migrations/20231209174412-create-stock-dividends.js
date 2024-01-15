"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stockdividends', {
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
      cashAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      declarationDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      dividendType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      exSividendSate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      frequency: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      paySate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      recordDate: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('stockdividends');
  }
};
