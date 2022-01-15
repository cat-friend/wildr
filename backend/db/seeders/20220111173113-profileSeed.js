'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Profiles', [
      {userId: 1, userIconId: 3},
      {userId: 2, userIconId: 2},
      {userId: 3, userIconId: 1}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
