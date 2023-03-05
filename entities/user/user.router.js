const Router = require('express');
const router = new Router();

const userController = require('./user.controller');

router.post('/register', userController.registration);
router.post('/login', userController.login);

module.exports = router;
