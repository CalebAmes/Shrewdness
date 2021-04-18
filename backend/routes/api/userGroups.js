const express = require('express');
const asyncHandler = require('express-async-handler');
const { UserGroupJoin } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async function (req, res) {
		const userGroup = await UserGroupJoin.findAll();
		return res.json({ userGroup });
	})
);

router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { userId, groupId } = req.body;
		const userGroup = await UserGroupJoin.createUserGroup({ userId, groupId });
		return res.json({ userGroup });
	})
);

module.exports = router;
