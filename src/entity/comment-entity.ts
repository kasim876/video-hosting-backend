import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';

import {Base} from '../utils/base';

import {UserEntity} from './user-entity';
import {VideoEntity} from './video-entity';

@Entity('comment')
export class CommentEntity extends Base {
  @ManyToOne(() => UserEntity, user => user.videos)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;

  @ManyToOne(() => VideoEntity, video => video.comments)
  @JoinColumn({name: 'video_id'})
  video: VideoEntity;

  @Column({type: 'text'})
  message: string;
}
