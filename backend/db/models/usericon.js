'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserIcon = sequelize.define('UserIcon', {
    url: DataTypes.STRING
  }, {});
  UserIcon.associate = function(models) {
    UserIcon.hasMany(models.User, { foreignKey: 'userIconId' });
  };
  return UserIcon;
};
