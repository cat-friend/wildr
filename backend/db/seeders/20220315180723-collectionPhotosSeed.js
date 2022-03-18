'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ImageCollections', [
      {
        collectionId: 1,
        photoId: 8
      },
      {
        collectionId: 1,
        photoId: 16
      },
      {
        collectionId: 2,
        photoId: 8
      },
      {
        collectionId: 2,
        photoId: 16
      },
      {
        collectionId: 2,
        photoId: 7
      },
      {
        collectionId: 2,
        photoId: 9
      },
      {
        collectionId: 2,
        photoId: 10
      },
      {
        collectionId: 2,
        photoId: 11
      },
      {
        collectionId: 2,
        photoId: 13
      },
      {
        collectionId: 2,
        photoId: 14
      },
      {
        collectionId: 2,
        photoId: 15
      },
      {
        collectionId: 2,
        photoId: 17
      },
      {
        collectionId: 2,
        photoId: 18
      },
      {
        collectionId: 2,
        photoId: 19
      },
      {
        collectionId: 2,
        photoId: 20
      },
      {
        collectionId: 2,
        photoId: 21
      },
      {
        collectionId: 2,
        photoId: 22
      },
      {
        collectionId: 2,
        photoId: 23
      },
      {
        collectionId: 2,
        photoId: 24
      },
      {
        collectionId: 3,
        photoId: 2
      },
      {
        collectionId: 3,
        photoId: 3
      },
      {
        collectionId: 3,
        photoId: 4
      },
      {
        collectionId: 4,
        photoId: 23
      },
      {
        collectionId: 4,
        photoId: 24
      },
      {
        collectionId: 5,
        photoId: 17
      },
      {
        collectionId: 5,
        photoId: 18
      },
      {
        collectionId: 5,
        photoId: 22
      },
      {
        collectionId: 6,
        photoId: 2
      },
      {
        collectionId: 6,
        photoId: 3
      },
      {
        collectionId: 6,
        photoId: 4
      },
      {
        collectionId: 6,
        photoId: 5
      },
      {
        collectionId: 7,
        photoId: 5
      },
      {
        collectionId: 7,
        photoId: 9
      },
      {
        collectionId: 7,
        photoId: 12
      },
      {
        collectionId: 8,
        photoId: 1
      },
      {
        collectionId: 8,
        photoId: 2
      },
      {
        collectionId: 8,
        photoId: 5
      },
      {
        collectionId: 8,
        photoId: 6
      },
      {
        collectionId: 9,
        photoId: 2
      },
      {
        collectionId: 9,
        photoId: 8
      },
      {
        collectionId: 9,
        photoId: 3
      },
      {
        collectionId: 9,
        photoId: 17
      },
      {
        collectionId: 9,
        photoId: 23
      },

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ImageCollections');

  }
};
