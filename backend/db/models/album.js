'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: {
      type: DataTypes.STRING,
      validation: {
        notNull: {
          msg: "Please enter a title for this album."
        },
        len: [3, 100]
      }
    },
    userId: DataTypes.INTEGER
  }, {});
  Album.associate = function (models) {
    Album.belongsTo(models.User, { foreignKey: 'userId' });
    Album.belongsTo(models.Image, { foreignKey: 'albumId' });
  };
  return Album;
};
