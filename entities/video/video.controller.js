const uuid = require('uuid');

class VideoController {
  async getAll(req, res) {}

  async getOne(req, res) {}

  async upload(req, res) {
    const {title, userId} = req.body;
    const videoFile = req.files.video;
    const thumbnailFile = req.files.thumbnail;

    const videoName = uuid.v4() + '.mp4';
    const thumbnailName = uuid.v4() + '.png';
  }
}

module.exports = new VideoController();
