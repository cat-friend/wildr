'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserIcon = sequelize.define('UserIcon', {
    url: DataTypes.STRING
  }, {});
  UserIcon.associate = function(models) {
    UserIcon.hasMany(models.Profile, { foreignKey: 'userIconId' });
  };
  return UserIcon;
};
