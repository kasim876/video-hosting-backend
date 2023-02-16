const Router = require('express');
const router = new Router();

const subscriptionController = require('./subscription.controller');

router.post('/', subscriptionController.addSubscription);
router.delete('/', subscriptionController.deleteSubscription);
router.get('/from_channel/:id', subscriptionController.getSubscriptions);
router.get('/to_channel/:id', subscriptionController.getSubscribers);

module.exports = router;
