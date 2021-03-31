'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'ChannelMessages',
      [
        {
          channelId: 1,
          userId: 1,
          messageText: faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 2,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 3,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 4,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 1,
          messageText: faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 2,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 3,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 4,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 1,
          messageText: faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 2,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 3,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 4,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 1,
          messageText: faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 2,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 3,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 4,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 1,
          messageText: faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 2,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 3,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 4,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 1,
          messageText: faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 2,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 3,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 4,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 1,
          messageText: faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 2,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 3,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 4,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 1,
          messageText: faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 2,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 3,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 4,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 1,
          messageText: faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 2,
          messageText:  faker.lorem.words(5),
        },
        {
          channelId: 1,
          userId: 3,
          messageText:  faker.lorem.words(5),
          messageImg: faker.image.animals(640, 480, true),
        },
        {
          channelId: 1,
          userId: 4,
          messageText:  faker.lorem.words(5),
        },
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ChannelMessages')
  }
};
