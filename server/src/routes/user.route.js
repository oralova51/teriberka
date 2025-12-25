const express = require('express');
const UserController = require('../controllers/user.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

const router = express.Router();

router.patch('/', verifyAccessToken, UserController.updateUserInfo);

module.exports = router;
