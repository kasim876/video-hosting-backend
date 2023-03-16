import {hash} from 'bcrypt';
import {BadRequestError, NotFoundError} from 'routing-controllers';
import {Not, Repository} from 'typeorm';

import {db} from '../db';
import {UserEntity} from '../entity/user-entity';
import {SubscriptionEntity} from '../entity/subscription-entity';
import {UserDto} from '../types/user-dto';

export class UserService {
  private readonly userRepository: Repository<UserEntity> = db.getRepository(UserEntity);
  private readonly subscriptionRepository: Repository<SubscriptionEntity> = db.getRepository(SubscriptionEntity);

  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async getAll() {
    return await this.userRepository.find();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {id},
      relations: {
        videos: true,
        subscriptions: {
          toChannel: true,
        },
      },
    });

    if (!user) throw new NotFoundError('Пользователь не найден');

    return user;
  }

  async updateProfile(id: number, dto: UserDto) {
    const user = await this.getOne(id);

    const oldUser = await this.userRepository.findOneBy({
      id: Not(id),
      email: dto.email,
    });
    if (oldUser) throw new BadRequestError('E-mail занят');

    dto.password && (user.password = await hash(dto.password, 5));
    user.email = dto.email;
    user.name = dto.name;
    user.avatarPath = dto.avatarPath;

    return await this.userRepository.save(user);
  }

  async subscribe(id: number, channelId: number) {
    const data = {
      fromUser: {
        id: id,
      },
      toChannel: {
        id: channelId,
      },
    };

    const channel = await this.userRepository.findOneBy({
      id: channelId,
    });

    const isSub = await this.subscriptionRepository.findOneBy(data);
    if (!isSub) {
      const newSub = this.subscriptionRepository.create(data);

      channel.subscribersCount++;

      await this.userRepository.save(channel);
      await this.subscriptionRepository.save(newSub);

      return true;
    }

    channel.subscribersCount--;

    await this.subscriptionRepository.delete(data);
    await this.userRepository.save(channel);

    return false;
  }
}
