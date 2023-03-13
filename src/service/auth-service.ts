import {Repository} from 'typeorm';
import jwt from 'jsonwebtoken';
import {compare, hash} from 'bcrypt';

import {UserEntity} from '../entity/user-entity';
import {db} from '../db';
import {AuthDto} from '../types/auth-dto';

export class AuthService {
  constructor(
    private readonly userRepository: Repository<UserEntity> = db.getRepository(
      UserEntity,
    ),
  ) {}

  async validateUser(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
      select: ['id', 'email', 'name', 'password'],
    });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const comparePassword = await compare(dto.password, user.password);

    if (!comparePassword) {
      throw new Error('Пароль неверный');
    }

    return user;
  }

  createAccessToken(userId: number) {
    const data = {
      id: userId,
    };

    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: '31d',
    });
  }

  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return {
      user: this.returnUserFields(user),
      accessToken: this.createAccessToken(user.id),
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (oldUser) {
      throw new Error('Данный e-mail уже зарегестрирован');
    }

    const hashPassword = await hash(dto.password, 3);

    const newUser = await this.userRepository.create({
      email: dto.email,
      name: dto.name,
      password: hashPassword,
    });

    const user = await this.userRepository.save(newUser);

    return {
      user: this.returnUserFields(user),
      accessToken: this.createAccessToken(user.id),
    };
  }
}
