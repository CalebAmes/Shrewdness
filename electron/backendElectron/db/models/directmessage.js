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
    DirectMessage.belongsTo(models.User, { foreignKey: 'userOneId' })
    DirectMessage.belongsTo(models.User, { foreignKey: 'userTwoId' })

    DirectMessage.hasMany(models.Notification, { foreignKey: 'directMessagesId' })
  };
  DirectMessage.createDirectMessage = async function ({ 
    userOneId, userTwoId, messageText, messageImg,
  }) {
    const directMessage = await DirectMessage.create({
      userOneId, userTwoId, messageText, messageImg,
    });
    return await DirectMessage.findByPk(directMessage.id)
  }

  return DirectMessage;
};