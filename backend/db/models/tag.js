'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    const imageTagsMapping = {
      through: 'ImagesTags',
      otherKey: 'imagesId',
      foreignKey: 'tagId'
    }
    Tag.belongsToMany(models.Image, imageTagsMapping);
  };
  return Tag;
};
