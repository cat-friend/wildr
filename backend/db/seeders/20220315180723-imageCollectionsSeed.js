'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ImageCollections', [
      {
        collectionId: 1,
        imageId: 8
      },
      {
        collectionId: 1,
        imageId: 16
      },
      {
        collectionId: 2,
        imageId: 8
      },
      {
        collectionId: 2,
        imageId: 16
      },
      {
        collectionId: 2,
        imageId: 7
      },
      {
        collectionId: 2,
        imageId: 9
      },
      {
        collectionId: 2,
        imageId: 10
      },
      {
        collectionId: 2,
        imageId: 11
      },
      {
        collectionId: 2,
        imageId: 13
      },
      {
        collectionId: 2,
        imageId: 14
      },
      {
        collectionId: 2,
        imageId: 15
      },
      {
        collectionId: 2,
        imageId: 17
      },
      {
        collectionId: 2,
        imageId: 18
      },
      {
        collectionId: 2,
        imageId: 19
      },
      {
        collectionId: 2,
        imageId: 20
      },
      {
        collectionId: 2,
        imageId: 21
      },
      {
        collectionId: 2,
        imageId: 22
      },
      {
        collectionId: 2,
        imageId: 23
      },
      {
        collectionId: 2,
        imageId: 24
      },
      {
        collectionId: 3,
        imageId: 2
      },
      {
        collectionId: 3,
        imageId: 3
      },
      {
        collectionId: 3,
        imageId: 4
      },
      {
        collectionId: 4,
        imageId: 23
      },
      {
        collectionId: 4,
        imageId: 24
      },
      {
        collectionId: 5,
        imageId: 17
      },
      {
        collectionId: 5,
        imageId: 18
      },
      {
        collectionId: 5,
        imageId: 22
      },
      {
        collectionId: 6,
        imageId: 2
      },
      {
        collectionId: 6,
        imageId: 3
      },
      {
        collectionId: 6,
        imageId: 4
      },
      {
        collectionId: 6,
        imageId: 5
      },
      {
        collectionId: 7,
        imageId: 5
      },
      {
        collectionId: 7,
        imageId: 9
      },
      {
        collectionId: 7,
        imageId: 12
      },
      {
        collectionId: 8,
        imageId: 1
      },
      {
        collectionId: 8,
        imageId: 2
      },
      {
        collectionId: 8,
        imageId: 5
      },
      {
        collectionId: 8,
        imageId: 6
      },
      {
        collectionId: 9,
        imageId: 2
      },
      {
        collectionId: 9,
        imageId: 8
      },
      {
        collectionId: 9,
        imageId: 3
      },
      {
        collectionId: 9,
        imageId: 17
      },
      {
        collectionId: 9,
        imageId: 23
      },

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ImageCollections');

  }
};
