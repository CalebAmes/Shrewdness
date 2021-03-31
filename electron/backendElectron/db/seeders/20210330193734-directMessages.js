'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DirectMessages',
    [
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 1,
        userTwoId: 2,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },
      {
        userOneId: 2,
        userTwoId: 1,
        messageText: faker.lorem.words(5),
        messageImg: faker.image.animals(640, 480, true),
      },

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DirectMessages')
  }
};
