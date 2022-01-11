'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      notNull: {
        msg: "Please enter a tag name."
      },
      validate: {
        len: [3, 100]
      }
    }
  }, {});
  Tag.associate = function (models) {
    const imageTagsMapping = {
      through: 'ImagesTags',
      otherKey: 'imagesId',
      foreignKey: 'tagId'
    }
    Tag.belongsToMany(models.Image, imageTagsMapping);
  };
  return Tag;
};
