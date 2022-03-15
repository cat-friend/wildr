'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Collections', [
      {
        title: "Big cats",
        userId: 1
      },
      {
        title: "Africa",
        userId: 2
      },
      {
        title: "Very cool",
        userId: 3
      },
      {
        title: "Safari",
        userId: 1
      },
      {
        title: "Large mammals",
        userId: 2
      },
      {
        title: "North America",
        userId: 3
      },
      {
        title: "Birds",
        userId: 1
      },
      {
        title: "Alaska",
        userId: 2
      },
      {
        title: "Animals I'd like to pet one day",
        userId: 3
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Collections', null, {});
  }
};
