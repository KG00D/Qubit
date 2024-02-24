"use strict";

let options = {};
options.tableName = 'Users';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
      },
      monthlyIncome: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      debtAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      nonSecuredDebtPayments: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      creditScore: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      housingSituation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      monthlyHousingPayment: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      carOwnership: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      carYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      carMake: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      carModel: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      monthlyCarPayment: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users', options);
  }
};
