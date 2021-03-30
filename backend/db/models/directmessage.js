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
  };
  return DirectMessage;
};