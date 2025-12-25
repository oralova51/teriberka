const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const skeletRouter = require('./skelet.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/skelets', skeletRouter);

module.exports = router;
