import 'reflect-metadata';
import {Body, JsonController, Post, Res} from 'routing-controllers';

import {AuthService} from '../service/auth-service';
import {AuthDto} from '../types/auth-dto';

@JsonController('/auth')
export class AuthController {
  private readonly authService: AuthService = new AuthService();

  @Post('/login')
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
}
