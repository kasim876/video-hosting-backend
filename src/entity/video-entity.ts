import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';

import {Base} from '../utils/base';

import {UserEntity} from './user-entity';
import {CommentEntity} from './comment-entity';

@Entity('video')
export class VideoEntity extends Base {
  @Column()
  name: string;

  @Column({default: 0})
  views: number;

  @Column({default: 0})
  likes: number;

  @Column({default: '', name: 'video_path'})
  videoPath: string;

  @Column({default: '', name: 'thumbnail_path'})
  thumbnailPath: string;

  @ManyToOne(() => UserEntity, user => user.videos)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;

  @OneToMany(() => CommentEntity, comment => comment.video)
  comments: CommentEntity[];
}
