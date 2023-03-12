import {Column, Entity, OneToMany} from 'typeorm';

import {Base} from '../utils/base';

import {VideoEntity} from './video-entity';
import {SubscriptionEntity} from './subscription-entity';

@Entity('user')
export class UserEntity extends Base {
  @Column({unique: true})
  email: string;

  @Column({select: false})
  password: string;

  @Column()
  name: string;

  @Column({default: 0, name: 'subscribers_count'})
  subscribersCount?: number;

  @Column({default: null, name: 'avatar_path'})
  avatarPath: string;

  @OneToMany(() => VideoEntity, video => video.user)
  videos: VideoEntity[];

  @OneToMany(() => SubscriptionEntity, sub => sub.fromUser)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, sub => sub.toChannel)
  subscribers: SubscriptionEntity[];
}
