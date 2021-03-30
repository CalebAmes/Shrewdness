'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    userId: DataTypes.INTEGER,
    channelMessagesId: DataTypes.INTEGER,
    dmsId: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};