const Router = require('express');
const router = new Router();

const userRouter = require('./entities/user/user.router');
const videoRouter = require('./entities/video/video.router');

router.use('/user', userRouter);
router.use('/video', videoRouter);

module.exports = router;
