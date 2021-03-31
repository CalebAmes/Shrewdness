'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' },
      },
      channelMessagesId: {
        type: Sequelize.INTEGER,
        references: { model: 'ChannelMessages' },
      },
      directMessagesId: {
        type: Sequelize.INTEGER,
        references: { model: 'DirectMessages' },
      },
      read: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notifications');
  }
};