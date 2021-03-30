'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    userId: DataTypes.INTEGER,
    channelMessagesId: DataTypes.INTEGER,
    directMessagesId: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.BelongsTo(models.User, { foreignKey: 'userId'})
    Notification.BelongsTo(models.ChannelMessage, { foreignKey: 'channelMessagesId'})
    Notification.BelongsTo(models.DirectMessage, { foreignKey: 'directMessagesId'})
  };
  return Notification;
};