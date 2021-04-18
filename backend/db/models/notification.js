'use strict';
module.exports = (sequelize, DataTypes) => {
	const Notification = sequelize.define(
		'Notification',
		{
			userId: DataTypes.INTEGER,
			channelMessagesId: DataTypes.INTEGER,
			directMessagesId: DataTypes.INTEGER,
			read: DataTypes.BOOLEAN,
		},
		{}
	);
	Notification.associate = function (models) {
		// associations can be defined here
		Notification.belongsTo(models.User, { foreignKey: 'userId' });
		Notification.belongsTo(models.ChannelMessage, { foreignKey: 'channelMessagesId' });
		Notification.belongsTo(models.DirectMessage, { foreignKey: 'directMessagesId' });
	};
	Notification.createNotification = async function ({ userId, channelMessagesId, directMessagesId, read }) {
		const notification = await Notification.create({
			userId,
			channelMessagesId,
			directMessagesId,
			read,
		});
		return await Notification.findByPk(notification.id);
	};

	return Notification;
};
