'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectMessage = sequelize.define('DirectMessage', {
    userOneId: DataTypes.INTEGER,
    userTwoId: DataTypes.INTEGER,
    messageText: DataTypes.STRING,
    messageImg: DataTypes.STRING
  }, {});
  DirectMessage.associate = function(models) {
    // associations can be defined here
    DirectMessage.BelongsTo(models.User, { foreignKey: 'userOneId' })
    DirectMessage.BelongsTo(models.User, { foreignKey: 'userTwoId' })

    DirectMessage.hasMany(models.Notification, { foreignKey: 'directMessagesId' })
  };
  return DirectMessage;
};