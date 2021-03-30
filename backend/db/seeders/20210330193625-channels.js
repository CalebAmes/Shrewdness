'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Channels',
      [
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 1,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 2,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 3,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
        {
          name: faker.lorem.word(),
          groupId: 4,
        },
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Channels');
  }
};
