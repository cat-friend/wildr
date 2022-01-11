'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: DataTypes.INTEGER,
    userIconId: DataTypes.INTEGER,
    description: {
      type: DataTypes.STRING,
      defaultValue: "Hello! I'm new to Wildr!",
      validate: {
        len: [10, 350]
      }
    }
  }, {});
  Profile.associate = function (models) {
    Profile.belongsTo(models.User, { foreignKey: 'userId' });
    Profile.belongsTo(models.UserIcon, { foreignKey: 'userIconId' });

  };
  return Profile;
};
