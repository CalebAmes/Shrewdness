"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Groups", [
      {
        name: "Gorillas",
        avatar: faker.image.cats(),
        description: faker.lorem.sentence(2)
      },
      {
        name: "Chimpanzees",
        avatar: faker.image.cats(),
        description: faker.lorem.sentence(2)
      },
      {
        name: "Origin Club",
        avatar: faker.image.cats(),
        description: `This is a Private Group for only the Shrewdest. If you don't know how to get in, you can't get in.`
      },
      {
        name: "Marmosets",
        avatar: faker.image.cats(),
        description: faker.lorem.sentence(2)
      },
      {
        name: "Papionini",
        avatar: faker.image.cats(),
        description: faker.lorem.sentence(2)
      },
      {
        name: "Macaque",
        avatar: faker.image.cats(),
        description: faker.lorem.sentence(2)
      },
      {
        name: "Baboons",
        avatar: faker.image.cats(),
        description: faker.lorem.sentence(2)
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Groups");
  }
};
