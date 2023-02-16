const Router = require('express');
const router = new Router();

const videoController = require('./video.controller');

router.get('/', videoController.getAll);
router.get('/:id', videoController.getOne);
router.post('/', videoController.upload);

module.exports = router;
