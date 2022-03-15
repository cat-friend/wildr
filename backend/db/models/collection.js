'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collections', {
    title: {
      type: DataTypes.STRING,
      validation: {
        notNull: {
          msg: "Please enter a title for this collection."
        },
        len: [3, 100]
      }
    },
    userId: DataTypes.INTEGER
  }, {});
  Collection.associate = function (models) {
    Collection.belongsTo(models.User, { foreignKey: 'userId' });

    const columnMapping = {
      through: 'CollectionPhotos',
      otherKey: 'imageId',
      foreignKey: 'collectionId'
    }

    Collection.belongsToMany(models.Image, columnMapping);
  };
  return Collection;
};
