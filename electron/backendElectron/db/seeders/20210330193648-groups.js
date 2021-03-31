'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Groups',
      [
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
        {
          name: faker.lorem.word(),
          avatar: faker.image.cats(),
          description: faker.lorem.sentence(6),
        },
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups')
  }
};
