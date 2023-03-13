import {FindOptionsWhereProperty, ILike, Repository} from 'typeorm';

import {db} from '../db';
import {VideoEntity} from '../entity/video-entity';
import {VideoDto} from '../types/video-dto';

export class VideoService {
  private readonly videoRepository: Repository<VideoEntity> =
    db.getRepository(VideoEntity);

  async create(id: number, dto: VideoDto) {
    const newVideo = this.videoRepository.create({
      name: dto.name,
      videoPath: dto.videoPath,
      thumbnailPath: dto.thumbnailPath,
      user: {id},
    });

    return this.videoRepository.save(newVideo);
  }

  async getAll(searchQuery?: string) {
    let options: FindOptionsWhereProperty<VideoEntity> = {};

    if (searchQuery) {
      options = {
        name: ILike(`%${searchQuery}%`),
      };
    }

    return this.videoRepository.find({
      where: {
        ...options,
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
          subscribersCount: true,
          subscriptions: true,
        },
      },
    });
  }

  async getOne(id: number) {
    return this.videoRepository.findOne({
      where: {id},
      relations: {
        user: true,
        comments: {
          user: true,
        },
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
          subscribersCount: true,
          subscriptions: true,
        },
        comments: {
          id: true,
          message: true,
          user: {
            id: true,
            name: true,
            avatarPath: true,
            subscribersCount: true,
            subscriptions: true,
          },
        },
      },
    });
  }

  async getMostPopular() {
    return this.videoRepository.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          avatarPath: true,
          subscribersCount: true,
          subscriptions: true,
        },
      },
      order: {
        views: -1,
      },
    });
  }

  async updateLikes(id: number) {
    const video = await this.getOne(id);

    video.likes++;

    return this.videoRepository.save(video);
  }

  async updateCountViews(id: number) {
    const video = await this.getOne(id);

    video.views++;

    return this.videoRepository.save(video);
  }
}
