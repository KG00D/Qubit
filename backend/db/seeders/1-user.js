'use strict';
const bcrypt = require("bcryptjs");

let options = {};
options.tableName = 'Users';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        firstName: 'Ted',
        hashedPassword: bcrypt.hashSync('password'),
        monthlyIncome: 5000.00,
        debtAmount: 20000.00,
        nonSecuredDebtPayments: 500.00,
        creditScore: 700,
        housingSituation: 'Rent',
        monthlyHousingPayment: 1500.00,
        carOwnership: 'Yes',
        carYear: 2015,
        carMake: 'Toyota',
        carModel: 'Camry',
        monthlyCarPayment: 300.00
      },
      {
        email: 'johnsmith@aol.com',
        firstName: 'John',
        hashedPassword: bcrypt.hashSync('password2'),
        monthlyIncome: 6000.00,
        debtAmount: 15000.00,
        nonSecuredDebtPayments: 400.00,
        creditScore: 650,
        housingSituation: 'Own',
        monthlyHousingPayment: 2000.00,
        carOwnership: 'Yes',
        carYear: 2018,
        carMake: 'Honda',
        carModel: 'Civic',
        monthlyCarPayment: 250.00
      },
      {
        email: 'tdizzle@protonmail.com',
        firstName: 'Tyler',
        hashedPassword: bcrypt.hashSync('password3'),
        monthlyIncome: 7000.00,
        debtAmount: 10000.00,
        nonSecuredDebtPayments: 300.00,
        creditScore: 720,
        housingSituation: 'Live with friends/relatives',
        monthlyHousingPayment: 0.00, 
        carOwnership: 'No',
        carYear: null, 
        carMake: null,
        carModel: null,
        monthlyCarPayment: null
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['demo@user.io', 'johnsmith@aol.com', 'tdizzle@protonmail.com'] }
    }, {});
  }
};

