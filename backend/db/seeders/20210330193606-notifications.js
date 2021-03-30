'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Notifications',
      [
        {
          userId: 1,
          channelMessagesId: 9,
          read: false,
        },
        {
          userId: 1,
          directMessagesId: 5,
          read: false,
        },
        {
          userId: 1,
          channelMessagesId: 2,
          read: false,
        },
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
