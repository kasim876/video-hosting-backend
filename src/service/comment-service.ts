import {Repository} from 'typeorm';

import {db} from '../db';
import {CommentEntity} from '../entity/comment-entity';

export class CommentService {
  private readonly commentRepository: Repository<CommentEntity> = db.getRepository(CommentEntity);

  async create(userId: number, videoId: number, message: string) {
    const newComment = this.commentRepository.create({
      message: message,
      user: {
        id: userId,
      },
      video: {
        id: videoId,
      },
    });

    return await this.commentRepository.save(newComment);
  }
}
