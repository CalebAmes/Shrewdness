const express = require('express');
const asyncHandler = require('express-async-handler');
const { ChannelMessage, User } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async function (req, res) {
		const channelMessage = await ChannelMessage.findAll({ order: [['updatedAt', 'DESC']] });
		return res.json({ channelMessage });
	})
);

router.get(
	'/:id',
	asyncHandler(async function (req, res) {
		const { id } = req.params;
		const channelMessage = await ChannelMessage.findAll({ where: { channelId: id }, include: User});
		return res.json({ channelMessage });
	})
)

router.post(
	'/',
	singleMulterUpload('image'),
	asyncHandler(async (req, res) => {
		const { channelId, userId, messageText } = req.body;
		const messageImg = await singlePublicFileUpload(req.file);
		const channelMessage = await ChannelMessage.createChannelMessage({
			channelId,
			userId,
			messageText,
			messageImg,
		});
		return res.json({ channelMessage });
	})
);

router.delete(
	'/:id(\\d+/delete)',
	asyncHandler(async (req, res) => {
		const { id } = req.body;
		const message = await ChannelMessage.findByPk(id);
		message.destroy();
		return res.json();
	})
);

router.put(
	'/update',
	asyncHandler(async (req, res) => {
		const { messageText, id } = req.body;
		const message = await ChannelMessage.findByPk(id);
		await message.update({
			messageText: messageText,
		});
		return res.json({ message });
	})
);

module.exports = router;
