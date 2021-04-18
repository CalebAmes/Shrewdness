const express = require('express');
const asyncHandler = require('express-async-handler');
const { Group } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async function (req, res) {
		const group = await Group.findAll();
		return res.json({ group });
	})
);

router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { name, avatar, description } = req.body;
		const group = await Group.createGroup({
			name,
			avatar,
			description,
		});
		return res.json({ group });
	})
);

module.exports = router;
