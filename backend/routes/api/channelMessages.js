const express = require('express');
const asyncHandler = require('express-async-handler');
const { ChannelMessage } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const channelMessage = await ChannelMessage.findAll(
    { order: [['updatedAt', 'DESC']] }
  );
  return res.json({ channelMessage })
}));

router.post(
  '/',
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { 
      channelId,
      userId,
      messageText,
    } = req.body;
    const messageImg = await singlePublicFileUpload(req.file);
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