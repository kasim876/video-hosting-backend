const SubscriptionEntity = require('../subscription/subscription.model');
const getUser = require('../utils/getUser');

class SubscriptionController {
  async getSubscriptions(req, res) {
    const id = req.params.id;

    let subscriptions = await SubscriptionEntity.findAll({
      where: {
        from_user_id: id,
      },
    });

    subscriptions = subscriptions.map(el => getUser(el.to_user_id));

    return Promise.all(subscriptions).then(data => res.json(data));
  }

  async getSubscribers(req, res) {
    const id = req.params.id;

    let subscribers = await SubscriptionEntity.findAll({
      where: {
        to_user_id: id,
      },
    });

    subscribers = subscribers.map(el => getUser(el.from_user_id));

    return Promise.all(subscribers).then(data => res.json(data));
  }

  async addSubscription(req, res) {
    const {fromUserId, toUserId} = req.body;

    const subscription = await SubscriptionEntity.create({
      from_user_id: fromUserId,
      to_user_id: toUserId,
    });

    return res.json(subscription);
  }

  async deleteSubscription(req, res) {
    const {fromUserId, toUserId} = req.body;

    const subscription = await SubscriptionEntity.destroy({
      where: {
        from_user_id: fromUserId,
        to_user_id: toUserId,
      },
    });

    return res.json(subscription);
  }
}

module.exports = new SubscriptionController();
