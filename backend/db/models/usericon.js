'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserIcon = sequelize.define('UserIcon', {
    url: DataTypes.STRING
  }, {});
  UserIcon.associate = function(models) {
    // associations can be defined here
  };
  return UserIcon;
};