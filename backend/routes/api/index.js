const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const channelMessagesRouter = require('./channelMessages.js');
const directMessagesRouter = require('./directMessages.js')
const channelRouter = require('./channels.js');
const groupRouter = require('./groups.js');
const notificationRouter = require('./notifications');
const userGroupRouter = require('./userGroups');

// const { restoreUser } = require('../../utils/auth.js');
// router.get('/restore-user', restoreUser, (req, res) => {
//   return res.json(req.user);
// });

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/channelMessages', channelMessagesRouter);
router.use('/directMessages', directMessagesRouter)
router.use('/channels', channelRouter);
router.use('/groups', groupRouter);
router.use('/notifications', notificationRouter);
router.use('/userGroups', userGroupRouter);

module.exports = router;
