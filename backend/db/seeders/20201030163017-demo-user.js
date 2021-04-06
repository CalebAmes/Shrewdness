'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'demo@user.io',
          username: 'Demo-lition',
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync('password'),
        },
        {
          email: faker.internet.email(),
          username: 'FakeUser1',
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: 'FakeUser2',
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: faker.lorem.word(),
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: faker.lorem.word(),
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: faker.lorem.word(),
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: faker.lorem.word(),
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: faker.lorem.word(),
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: faker.lorem.word(),
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: faker.lorem.word(),
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
        {
          email: faker.internet.email(),
          username: faker.lorem.word(),
          bio: faker.lorem.sentence(3),
          avatar: faker.image.avatar(),
          hashedPassword: bcrypt.hashSync(faker.internet.password())
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Users',
      {
        username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      },
      {}
    );
  }
};
