const Router = require('express');
const router = new Router();

const userRouter = require('./user/user.router');
const videoRouter = require('./video/video.router');
const subscriptionRouter = require('./subscription/subscription.router');

router.use('/user', userRouter);
router.use('/video', videoRouter);
router.use('/subscription', subscriptionRouter);

module.exports = router;
