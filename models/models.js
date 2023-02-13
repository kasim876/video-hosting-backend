const User = require('./user');
const Video = require('./video');
const Subscriptions = require('./subscriptions');
const Comment = require('./comment');

User.hasMany(Video, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Video, {
  foreignKey: 'video_id',
});

Video.belongsTo(User, {
  foreignKey: 'user_id',
});

Video.hasMany(Comment, {
  foreignKey: 'video_id',
});

module.exports = {
  User,
  Video,
  Comment,
  Subscriptions,
};
