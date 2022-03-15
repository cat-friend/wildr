'use strict';
module.exports = (sequelize, DataTypes) => {
  const Albums = sequelize.define('Albums', {
    name: DataTypes.STRING,
    user_Id: DataTypes.INTEGER
  }, {});
  Albums.associate = function(models) {
    // associations can be defined here
  };
  return Albums;
};