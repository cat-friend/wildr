'use strict';
module.exports = (sequelize, DataTypes) => {
  const ImagesTag = sequelize.define('ImagesTag', {
    imageId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  ImagesTag.associate = function(models) {
    // associations can be defined here
  };
  return ImagesTag;
};