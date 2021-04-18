const express = require('express');
const asyncHandler = require('express-async-handler');
const { Channel } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async function (req, res) {
		const channel = await Channel.findAll();
		return res.json({ channel });
	})
);

router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { name, groupId } = req.body;
		const channel = await Channel.createChannel({
			name,
			groupId,
		});
		return res.json({ channel });
	})
);

module.exports = router;
