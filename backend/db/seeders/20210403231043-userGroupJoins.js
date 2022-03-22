"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("UserGroupJoins", [
      {
        userId: 1,
        groupId: 1
      },
      {
        userId: 1,
        groupId: 2
      },
      {
        userId: 1,
        groupId: 3
      },
      {
        userId: 1,
        groupId: 4
      },
      {
        userId: 1,
        groupId: 5
      },
      {
        userId: 2,
        groupId: 1
      },
      {
        userId: 2,
        groupId: 2
      },
      {
        userId: 2,
        groupId: 3
      },
      {
        userId: 2,
        groupId: 1
      },
      {
        userId: 3,
        groupId: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users");
  }
};
