'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        title: "Fireweed in Unalaska, AK",
        url: "https://www.denisepli.com/wildr/images/01.jpg",
        description: "Taken with a Canon point and shoot",
        userId: 1
      },
      {
        title: "Fox",
        url: "https://www.denisepli.com/wildr/images/02.jpg",
        description: "Fox in Unalaska, AK",
        userId: 2
      },
      {
        title: "Sea snail",
        url: "https://www.denisepli.com/wildr/images/03.jpg",
        description: "Sea snail in Olympic National Park, WA USA",
        userId: 3
      },
      {
        title: "Mushrooms in ferns",
        url: "https://www.denisepli.com/wildr/images/04.jpg",
        description: "Mushrooms in ferns, taken in Olympic National Park, WA USA",
        userId: 1
      },
      {
        title: "Bald Eagle Eating Salmon",
        url: "https://www.denisepli.com/wildr/images/05.jpg",
        description: "Bald Eagle Eating Salmon. Unalaska, AK",
        userId: 2
      },
      {
        title: "Salmon shark",
        url: "https://www.denisepli.com/wildr/images/06.jpg",
        description: "Salmon shark, Bering Sea, AK USA",
        userId: 3
      },
      {
        title: "Giraffe",
        url: "https://www.denisepli.com/wildr/images/07.JPG",
        description: "Giraffe on a camera trap at a waterhole, Kalahari Desert, Botswana",
        userId: 1
      },
      {
        title: "Juvenile Lions at Waterhole",
        url: "https://www.denisepli.com/wildr/images/08.JPG",
        description: "Waterhole camera trap, Kalahari Desert, Botswana",
        userId: 2
      },
      {
        title: "Ostrich",
        url: "https://www.denisepli.com/wildr/images/09.JPG",
        description: "Ostrich at a dry waterhole. Kalahari Desert, Botswana",
        userId: 3
      },
      {
        title: "Pack of wild dogs",
        url: "https://www.denisepli.com/wildr/images/10.JPG",
        description: "Camera trap photo. Kalahari Desert, Botswana",
        userId: 1
      },
      {
        title: "Eland at night",
        url: "https://www.denisepli.com/wildr/images/11.JPG",
        description: "Camera trap photo. Kalahari Desert, Botswana",
        userId: 2
      },
      {
        title: "Vultures",
        url: "https://www.denisepli.com/wildr/images/12.JPG",
        description: "Endangered lappet-faced vultures. Kalahari Desert, Botswana",
        userId: 3
      },
      {
        title: "Pack of wild dogs, hunting",
        url: "https://www.denisepli.com/wildr/images/13.JPG",
        description: "Pack of wild dogs hunting a kudu at a waterhole. Kalahari Desert, Botswana",
        userId: 1
      },
      {
        title: "Ostrich",
        url: "https://www.denisepli.com/wildr/images/14.JPG",
        description: "Ostrich at a waterhole. Kalahari Desert, Botswana",
        userId: 2
      },
      {
        title: "Kudu drinking",
        url: "https://www.denisepli.com/wildr/images/15.JPG",
        description: "Kudu drinking at a waterhole. Kalahari Desert, Botswana",
        userId: 3
      },
      {
        title: "Juvenile lioness",
        url: "https://www.denisepli.com/wildr/images/16.JPG",
        description: "Camera trap photo. Kalahari Desert, Botswana",
        userId: 1
      },
      {
        title: "Gazelle",
        url: "https://www.denisepli.com/wildr/images/17.JPG",
        description: "Gazelles drinking at a waterhole",
        userId: 2
      },
      {
        title: "Gazelles",
        url: "https://www.denisepli.com/wildr/images/18.JPG",
        description: "Gazelles drinking at a waterhole. Kalahari Desert, Botswana",
        userId: 3
      },
      {
        title: "Gemsbok at night",
        url: "https://www.denisepli.com/wildr/images/19.JPG",
        description: "Camera trap photo of gemsbok (oryx) at night",
        userId: 1
      },
      {
        title: "Gemsbok, daytime",
        url: "https://www.denisepli.com/wildr/images/20.JPG",
        description: "Camera trap photo of gemsbok during the day. Kalahari Desert, Botswana",
        userId: 2
      },
      {
        title: "Serrated tortoise",
        url: "https://www.denisepli.com/wildr/images/21.JPG",
        description: "Serrated tortoise. Kalahari Desert, Botswana",
        userId: 3
      },
      {
        title: "Gemsbok",
        url: "https://www.denisepli.com/wildr/images/22.JPG",
        description: "Gemsbok at a waterhole.",
        userId: 1
      },
      {
        title: "Wildebeest",
        url: "https://www.denisepli.com/wildr/images/23.JPG",
        description: "Endangered wildebeest in the Kalahari.",
        userId: 2
      },
      {
        title: "Sunrise on the pan",
        url: "https://www.denisepli.com/wildr/images/24.JPG",
        description: "Sunrise in Khutse, Kalahari Desert, Botswana.",
        userId: 3
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};
