"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('plaidItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      availableProducts: {
        type: Sequelize.JSON,
        allowNull: true
      },
      billedProducts: {
        type: Sequelize.JSON,
        allowNull: true
      },
      error: {
        type: Sequelize.STRING,
        allowNull: true
      },
      institutionId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updateType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      webhook: {
        type: Sequelize.STRING,
        allowNull: true
      },
      consentExpirationTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastSuccessfulUpdate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastFailedUpdate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastWebhookSentAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastWebhookCodeSent: {
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
    return queryInterface.dropTable('plaidItems');
  }
};
