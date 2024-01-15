'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
console.log('Running the User Seeder')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        email: 'demo@user.io',
        firstName: 'Ted',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 2,
        email: 'johnsmith@aol.com',
        firstName: 'John',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: 3,
        email: 'tdizzle@protonmail.com',
        firstName: 'Tyler',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { exclude: ['id'] });
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['demo@user.io', 'johnsmith@aol.com', 'tdizzle@protonmail.com'] }
    }, {});
  }
};

