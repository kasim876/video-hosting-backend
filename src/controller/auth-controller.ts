import 'reflect-metadata';
import {Response} from 'express';
import {Body, JsonController, Post, Res} from 'routing-controllers';

import {AuthService} from '../service/auth-service';
import {AuthDto} from '../types/auth-dto';

@JsonController('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService = new AuthService()) {}

  @Post('/login')
  async login(@Body() dto: AuthDto, @Res() res: Response) {
    const data = await this.authService.login(dto);

    return res.json(data);
  }

  @Post('/register')
  async register(@Body() dto: AuthDto, @Res() res: Response) {
    const data = await this.authService.login(dto);

    return res.json(data);
  }
}
