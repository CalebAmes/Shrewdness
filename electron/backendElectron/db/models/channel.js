'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING,
    groupId: DataTypes.INTEGER
  }, {});
  Channel.associate = function(models) {
    // associations can be defined here
  };
  Channel.createChannel = async function ({ 
    name, groupId,
  }) {
    const channel = await Channel.create({
      name, groupId,
    });
    return await Channel.findByPk(channel.id)
  }

  return Channel;
};