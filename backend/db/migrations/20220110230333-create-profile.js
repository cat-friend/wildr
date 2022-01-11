'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userIconId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: defaultIcon()
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "Hello! I'm new to Wildr!"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Profiles');
  }
};

const defaultIcon = () => {
const iconNum = Math.ceil(Math.random() * 15);
}
