'use strict';
module.exports = (sequelize, DataTypes) => {
  const CollectionPhoto = sequelize.define('CollectionPhoto', {
    collectionId: {
      type: DataTypes.INTEGER,
      references: { model: 'Collection' }
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: { model: 'Image' }
    },
  }, {});
  CollectionPhoto.associate = function (models) {
    // associations can be defined here
  };
  return CollectionPhoto;
};
