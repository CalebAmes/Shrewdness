const express = require("express");
const asyncHandler = require("express-async-handler");
const { Notification } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async function(req, res) {
    const notification = await Notification.findAll();
    return res.json({ notification });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { userId, channelMessageId, directMessageId, read } = req.body;
    const notification = await Notification.createNotification({
      userId,
      channelMessageId,
      directMessageId,
      read
    });
    return res.json({ notification });
  })
);

module.exports = router;
