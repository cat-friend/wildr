'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Album.associate = function(models) {
    Album.belongsTo(models.User, {foreignKey: 'userId'});
    Album.belongsTo(models.Image, {foreignKey: 'albumId'});
  };
  return Album;
};
