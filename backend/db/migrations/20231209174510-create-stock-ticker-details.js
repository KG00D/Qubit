"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stocktickerdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      requestId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      address1: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      postalCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      iconUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logoUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cik: {
        type: Sequelize.STRING,
        allowNull: true
      },
      compositeFigi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      currencyName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      homepageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      listDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: true
      },
      market: {
        type: Sequelize.STRING,
        allowNull: true
      },
      marketCap: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      primaryExchange: {
        type: Sequelize.STRING,
        allowNull: true
      },
      roundLot: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      shareClassFigi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shareClassSharesOutstanding: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      sicCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sicDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ticker: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tickerRoot: {
        type: Sequelize.STRING,
        allowNull: true
      },
      totalEmployees: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      weightedSharesOutstanding: {
        type: Sequelize.BIGINT,
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
    await queryInterface.dropTable('stocktickerdetails');
  }
};

