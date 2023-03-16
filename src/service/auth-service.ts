import {BadRequestError, NotFoundError, UnauthorizedError} from 'routing-controllers';
import {Repository} from 'typeorm';
import jwt from 'jsonwebtoken';
import {compare, hash} from 'bcrypt';

import {UserEntity} from '../entity/user-entity';
import {db} from '../db';
import {AuthDto} from '../types/auth-dto';
import {UserService} from './user-service';

export class AuthService {
  private readonly userRepository: Repository<UserEntity> = db.getRepository(UserEntity);
  private readonly userService: UserService = new UserService();

  createAccessToken(userId: number) {
    const data = {
      id: userId,
    };

    return jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: '31d',
    });
  }

  async validateUser(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
      select: ['id', 'email', 'name', 'password'],
    });

    if (!user) throw new NotFoundError('Пользователь не найден');

    const isCorrectPassword = await compare(dto.password, user.password);
    if (!isCorrectPassword) throw new UnauthorizedError('Неправильный пароль');

    return user;
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userRepository.findOneBy({email: dto.email});
    if (oldUser) throw new BadRequestError('E-mail занят');

    const hashPassword = await hash(dto.password, 5);

    const newUser = this.userRepository.create({
      email: dto.email,
      name: dto.name,
      password: hashPassword,
    });

    const user = await this.userRepository.save(newUser);

    return {
      user: this.userService.returnUserFields(user),
      accessToken: this.createAccessToken(user.id),
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return {
      user: this.userService.returnUserFields(user),
      accessToken: this.createAccessToken(user.id),
    };
  }
}
