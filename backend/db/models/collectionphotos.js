'use strict';
module.exports = (sequelize, DataTypes) => {
  const ImageCollection = sequelize.define('ImageCollection', {
    collectionId: {
      type: DataTypes.INTEGER,
      references: { model: 'Collection' }
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: { model: 'Image' }
    },
  }, {});
  ImageCollection.associate = function (models) {
    // associations can be defined here
  };
  return ImageCollection;
};
