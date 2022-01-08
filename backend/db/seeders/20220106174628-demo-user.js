'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'DemoUser01',
        hashedPassword: bcrypt.hashSync('password01'),
      },
      {
        email: 'fakeuser01@user.io',
        username: 'FakeUser01',
        hashedPassword: bcrypt.hashSync('password02'),
      },
      {
        email: 'fakeuser02@user.io',
        username: 'FakeUser02',
        hashedPassword: bcrypt.hashSync('password03'),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['DemoUser01', 'FakeUser01', 'FakeUser02'] }
    }, {});
  }
};
