const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3')
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('bio')
    .exists({ checkFalsy: true })
    .isLength({ max: 140})
    .withMessage('Please provide a bio that is less than 140 characters'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.get('/', asyncHandler(async function (req, res) {
  const users = await User.findAll();
  return res.json({ users })
}))

// Sign up
router.post (
  '/',
  singleMulterUpload("avatar"),
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, bio, } = req.body;
    let avatar;
    if(req.file){
      avatar = await singlePublicFileUpload(req.file);
    }
    const user = await User.signup({ email, username, avatar,  password, bio });
    
    setTokenCookie(res, user);
    return res.json({
      user
    });
  })
);

module.exports = router;
