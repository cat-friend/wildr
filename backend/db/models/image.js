'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    albumsId: DataTypes.INTEGER
  }, {});
  Image.associate = function (models) {
    Image.belongsTo(models.User, { foreignKey: 'userId' });
    Image.hasMany(models.Profile, { foreignKey: 'imageId' });
    Image.hasOne(models.Album, { foreignKey: 'albumId' });
    const imageTagsMapping = {
      through: 'ImagesTags',
      otherKey: 'tagId',
      foreignKey: 'imageId'
    }
    Image.belongsToMany(models.Tag, imageTagsMapping);
  };
  return Image;
};
