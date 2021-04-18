const express = require('express');
const asyncHandler = require('express-async-handler');
const { DirectMessage } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async function (req, res) {
		const directMessage = await DirectMessage.findAll();
		return res.json({ directMessage });
	})
);

router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { userOneId, userTwoId, messageText, messageImg } = req.body;
		const directMessage = await DirectMessage.createDirectMessage({
			userOneId,
			userTwoId,
			messageText,
			messageImg,
		});
		return res.json({ directMessage });
	})
);

module.exports = router;
