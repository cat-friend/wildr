'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    description: DataTypes.STRING(350)
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, {foreignKey: 'userId'});
    Profile.belongsTo(models.Image, {foreignKey: 'imageId'});

  };
  return Profile;
};
