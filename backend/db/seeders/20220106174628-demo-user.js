'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoUser01',
        hashedPassword: bcrypt.hashSync('password01'),
        userIconId: 1
      },
      {
        email: 'fakeuser01@user.io',
        username: 'FakeUser01',
        hashedPassword: bcrypt.hashSync('password02'),
        userIconId: 2
      },
      {
        email: 'fakeuser02@user.io',
        username: 'FakeUser02',
        hashedPassword: bcrypt.hashSync('password03'),
        userIconId: 3
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
