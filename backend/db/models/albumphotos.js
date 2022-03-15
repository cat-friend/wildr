'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumPhotos = sequelize.define('AlbumPhotos', {
    albumId: DataTypes.INTEGER,
    photoId: DataTypes.INTEGER
  }, {});
  AlbumPhotos.associate = function(models) {
    // associations can be defined here
  };
  return AlbumPhotos;
};