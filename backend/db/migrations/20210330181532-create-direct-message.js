"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("DirectMessages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userOneId: {
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      userTwoId: {
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      messageText: {
        type: Sequelize.STRING(600)
      },
      messageImg: {
        type: Sequelize.STRING(100)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("DirectMessages");
  }
};
