'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    url: {
      type: DataTypes.STRING,
      notNull: {
        msg: "Please enter a URL for this image."
      },
      validation: {
        isntUrl(value) {
          if (!validator.isUrl(value)) {
            throw new Error('Please enter a valid URL for the image.')
          }
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      notNull: {
        msg: "Please enter a title for this image."
      },
      validation: {
        len: [3, 100]
      }
    },
    description: {
      type: DataTypes.STRING,
      validation: {
        descLength(value) {
          if (value.length) {
            if (value.length < 10) {
              throw new Error('Description must be at least 10 characters long.')
            }
            if (value.length > 350) {
              throw new Error('Description must be less than 350 characters long.')
            }
          }
        }
      }
    },
    userId: DataTypes.INTEGER,
  }, {});
  Image.associate = function (models) {
    Image.belongsTo(models.User, { foreignKey: 'userId' });

    const columnMapping = {
      through: 'CollectionPhotos',
      otherKey: 'collectionId',
      foreignKey: 'imageId'
    }

    Image.hasMany(models.Collection, columnMapping);
    const imageTagsMapping = {
      through: 'ImagesTags',
      otherKey: 'tagId',
      foreignKey: 'imageId'
    }
    Image.belongsToMany(models.Tag, imageTagsMapping);
  };
  return Image;
};
