'use strict';
module.exports = (sequelize, DataTypes) => {
	const ChannelMessage = sequelize.define(
		'ChannelMessage',
		{
			channelId: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			messageText: DataTypes.STRING,
			messageImg: DataTypes.STRING,
		},
		{}
	);
	ChannelMessage.associate = function (models) {
		// associations can be defined here
		ChannelMessage.belongsTo(models.User, { foreignKey: 'userId' });
		ChannelMessage.hasMany(models.Notification, { foreignKey: 'channelMessagesId' });
	};
	ChannelMessage.createChannelMessage = async function ({ channelId, userId, messageText, messageImg }) {
		const channelMessage = await ChannelMessage.create({
			channelId,
			userId,
			messageText,
			messageImg,
		});
		return await ChannelMessage.findByPk(channelMessage.id);
	};

	return ChannelMessage;
};
