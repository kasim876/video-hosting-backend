const path = require('path');
const uuid = require('uuid');

const VideoEntity = require('../video/video.model');

class VideoController {
  async getAll(req, res) {
    const videos = VideoEntity.findAll();

    return res.json(videos);
  }

  async getOne(req, res) {
    const id = req.params.id;

    const video = VideoEntity.findOne({
      where: {
        id,
      },
    });

    return res.json(video);
  }

  async upload(req, res) {
    const {title, userId} = req.body;
    const videoFile = req.files.video;
    const thumbnailFile = req.files.thumbnail;

    const videoName = uuid.v4() + '.mp4';
    const thumbnailName = uuid.v4() + '.png';

    videoFile.mv(path.resolve(__dirname, '../static/video', videoName));
    thumbnailFile.mv(
      path.resolve(__dirname, '../static/thumbnail', thumbnailName),
    );

    const video = await VideoEntity.create({
      name: title,
      video_path: videoName,
      thumbnail_path: thumbnailName,
      user_id: userId,
    });

    return res.json(video);
  }
}

module.exports = new VideoController();
