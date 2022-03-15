'use strict';
module.exports = (sequelize, DataTypes) => {
  const CollectionPhotos = sequelize.define('CollectionPhotos', {
    collectionId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  CollectionPhotos.associate = function(models) {
    // associations can be defined here
  };
  return CollectionPhotos;
};
