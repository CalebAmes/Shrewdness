const express = require('express');
const asyncHandler = require('express-async-handler');
const { ChannelMessage } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const channelMessage = await ChannelMessage.findAll();
  return res.json({ channelMessage })
}));

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { 
      channelId,
      userId,
      messageText,
      messageImg,
    } = req.body;
    const channelMessage = await ChannelMessage.createChannelMessage({ 
      channelId,
      userId,
      messageText,
      messageImg,
    });
    return res.json({ channelMessage })
  })
)

module.exports = router;