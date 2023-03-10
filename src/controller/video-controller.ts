import 'reflect-metadata';
import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers';
import {Request, Response} from 'express';
import {v4} from 'uuid';
import multer from 'multer';

import db from '../db';
import * as path from 'path';

interface IRequestBody {
  title: string;
  userId: number;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../static/' + file.fieldname));
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const filename = v4();

    cb(null, filename + '.' + ext);
  },
});

const upload = multer({storage: storage});

@JsonController()
@UseBefore(upload.fields([{name: 'video'}, {name: 'thumbnail'}]))
export class VideoController {
  @Post('/video')
  async upload(
    @Req() request: Request,
    @Body() body: IRequestBody,
    @Res() response: Response,
  ) {
    const {title, userId} = body;

    const videoFile = request.files['video'][0];
    const thumbnail = request.files['thumbnail'][0];

    const video = await db.query(
      `INSERT INTO videos (title, video, thumbnail, created_at, user_id) values ($1, $2, $3, $4, $5) RETURNING *`,
      [title, videoFile.filename, thumbnail.filename, new Date(), userId],
    );

    return response.json(video.rows[0]);
  }

  @Get('/video')
  async getAll(@Res() response: Response) {
    const videos = await db.query(
      `
        SELECT 
          videos.user_id AS "userId",
          users.name AS "userName",
          users.avatar AS "userAvatar",
          videos.id,
          videos.title,
          videos.video AS "videoName",
          videos.thumbnail AS "thumbnailName",
          videos.created_at AS "createdAt"
        FROM videos
        JOIN users ON videos.user_id = users.id
      `,
    );

    return response.json(videos.rows);
  }

  @Get('/video/:id')
  async getOne(@Param('id') id: number, @Res() response: Response) {
    const video = await db.query(
      `
        SELECT 
          videos.user_id AS "userId",
          users.name AS "userName",
          users.avatar AS "userAvatar",
          videos.id,
          videos.title,
          videos.video AS "videoName",
          videos.thumbnail AS "thumbnailName",
          videos.created_at AS "createdAt"
        FROM videos
        JOIN users ON videos.user_id = users.id
        WHERE videos.id = $1
      `,
      [id],
    );

    return response.json(video.rows[0]);
  }
}
