import {Not, Repository} from 'typeorm';

import {UserEntity} from '../entity/user-entity';
import {db} from '../db';
import {SubscriptionEntity} from '../entity/subscription-entity';
import {UserDto} from '../types/user-dto';
import {hash} from 'bcrypt';

export class UserService {
  constructor(
    private readonly userRepository: Repository<UserEntity> = db.getRepository(
      UserEntity,
    ),
    private readonly subscriptionRepository: Repository<SubscriptionEntity> = db.getRepository(
      SubscriptionEntity,
    ),
  ) {}

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

    if (!user) throw new Error('Пользователь не найден');

    return user;
  }

  async updateProfile(id: number, dto: UserDto) {
    const user = await this.getOne(id);

    const oldUser = await this.userRepository.findOneBy({
      email: dto.email,
      id: Not(id),
    });

    if (oldUser) {
      throw new Error('Данный e-mail уже зарегестрирован');
    }

    if (dto.password) {
      user.password = await hash(dto.password, 3);
    }

    user.email = dto.email;
    user.name = dto.name;
    user.avatarPath = dto.avatarPath;

    await this.userRepository.save(user);

    return this.getOne(id);
  }

  async subscribe(id: number, channelId: number) {
    const data = {
      toChannel: {id: channelId},
      fromUser: {id},
    };

    const isSub = await this.subscriptionRepository.findOneBy(data);

    if (!isSub) {
      const newSub = await this.subscriptionRepository.create(data);

      await this.subscriptionRepository.save(newSub);

      return true;
    }

    await this.subscriptionRepository.delete(data);

    return false;
  }

  async getAll() {
    return this.userRepository.find();
  }
}
