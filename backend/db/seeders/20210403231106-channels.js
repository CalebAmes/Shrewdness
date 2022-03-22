"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Channels", [
      {
        name: "General",
        groupId: 1
      },
      {
        name: "Tips and Tricks",
        groupId: 1
      },
      {
        name: "Animals",
        groupId: 1
      },
      {
        name: "Flex",
        groupId: 1
      },
      {
        name: "Foodies",
        groupId: 1
      },
      {
        name: "General",
        groupId: 2
      },
      {
        name: "Tips and Tricks",
        groupId: 2
      },
      {
        name: "Animals",
        groupId: 2
      },
      {
        name: "Flex",
        groupId: 2
      },
      {
        name: "Foodies",
        groupId: 2
      },
      {
        name: "General",
        groupId: 7
      },
      {
        name: "Tips and Tricks",
        groupId: 7
      },
      {
        name: "Animals",
        groupId: 7
      },
      {
        name: "Flex",
        groupId: 7
      },
      {
        name: "Foodies",
        groupId: 7
      },
      {
        name: "General",
        groupId: 4
      },
      {
        name: "Tips and Tricks",
        groupId: 4
      },
      {
        name: "Animals",
        groupId: 4
      },
      {
        name: "Flex",
        groupId: 4
      },
      {
        name: "Foodies",
        groupId: 4
      },
      {
        name: "General",
        groupId: 5
      },
      {
        name: "Tips and Tricks",
        groupId: 5
      },
      {
        name: "Animals",
        groupId: 5
      },
      {
        name: "Flex",
        groupId: 5
      },
      {
        name: "Foodies",
        groupId: 5
      },
      {
        name: "General",
        groupId: 6
      },
      {
        name: "Tips and Tricks",
        groupId: 6
      },
      {
        name: "Animals",
        groupId: 6
      },
      {
        name: "Flex",
        groupId: 6
      },
      {
        name: "chatRoom 3",
        groupId: 3
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Channels");
  }
};
