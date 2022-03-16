'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    title: {
      type: DataTypes.STRING,
      validation: {
        notNull: {
          msg: "Please enter a title for this collection."
        },
        len: [3, 100]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'Users' },
      allowNull: false
    }
  }, {});
  Collection.associate = function (models) {
    Collection.belongsTo(models.User, { foreignKey: 'userId' });

    const columnMapping = {
      through: 'CollectionPhoto',
      otherKey: 'imageId',
      foreignKey: 'collectionId',
      onDelete: 'cascade'
    }

    Collection.belongsToMany(models.Image, columnMapping);
  };
  return Collection;
};
