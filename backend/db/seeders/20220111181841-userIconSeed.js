'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserIcons', [
      { url: "http://www.denisepli.com/wildr/images/icon01.png" },
      { url: "http://www.denisepli.com/wildr/images/icon02.png" },
      { url: "http://www.denisepli.com/wildr/images/icon03.png" },
      { url: "http://www.denisepli.com/wildr/images/icon04.png" },
      { url: "http://www.denisepli.com/wildr/images/icon05.png" },
      { url: "http://www.denisepli.com/wildr/images/icon06.png" },
      { url: "http://www.denisepli.com/wildr/images/icon07.png" },
      { url: "http://www.denisepli.com/wildr/images/icon08.png" },
      { url: "http://www.denisepli.com/wildr/images/icon09.png" },
      { url: "http://www.denisepli.com/wildr/images/icon10.png" },
      { url: "http://www.denisepli.com/wildr/images/icon11.png" },
      { url: "http://www.denisepli.com/wildr/images/icon12.png" },
      { url: "http://www.denisepli.com/wildr/images/icon13.png" },
      { url: "http://www.denisepli.com/wildr/images/icon14.png" },
      { url: "http://www.denisepli.com/wildr/images/icon15.png" }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserIcons');
  }
};
