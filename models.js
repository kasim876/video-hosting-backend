const UserEntity = require('./user/user.model');
const VideoEntity = require('./video/video.model');
const SubscriptionEntity = require('./subscription/subscription.model');
const CommentEntity = require('./comment/comment.model');

UserEntity.hasMany(VideoEntity, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});

VideoEntity.belongsTo(UserEntity, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});

UserEntity.hasMany(CommentEntity, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});

CommentEntity.belongsTo(UserEntity, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});

VideoEntity.hasMany(CommentEntity, {
  foreignKey: {
    name: 'video_id',
    allowNull: false,
  },
});

CommentEntity.belongsTo(VideoEntity, {
  foreignKey: {
    name: 'video_id',
    allowNull: false,
  },
});

UserEntity.hasMany(SubscriptionEntity, {
  foreignKey: {
    name: 'from_user_id',
    allowNull: false,
  },
});

SubscriptionEntity.belongsTo(UserEntity, {
  foreignKey: {
    name: 'from_user_id',
    allowNull: false,
  },
});

UserEntity.hasMany(SubscriptionEntity, {
  foreignKey: {
    name: 'to_user_id',
    allowNull: false,
  },
});

SubscriptionEntity.belongsTo(UserEntity, {
  foreignKey: {
    name: 'to_user_id',
    allowNull: false,
  },
});

module.exports = {
  User,
  Video,
  Comment,
  Subscriptions,
};
