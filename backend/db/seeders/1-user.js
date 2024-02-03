'use strict';
const bcrypt = require("bcryptjs");

let options = {};
options.tableName = 'Users';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
    up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Ted',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'johnsmith@aol.com',
        firstName: 'John',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'tdizzle@protonmail.com',
        firstName: 'Tyler',
        hashedPassword: bcrypt.hashSync('password3')
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

