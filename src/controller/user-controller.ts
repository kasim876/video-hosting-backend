import 'reflect-metadata';
import {Response} from 'express';
import {Body, JsonController, Post, Res} from 'routing-controllers';

interface IUser {
  email: string;
  password: string;
  username?: string;
}

@JsonController()
export class UserController {
  @Post('/users/registration')
  register(@Body() user: IUser, @Res() response: Response) {
    const {email, username, password} = user;

    return response.json(`Вы зарегестрировались`);
  }

  @Post('/users/login')
  login(@Body() user: IUser, @Res() response: Response) {
    const {email, password} = user;

    return response.json(`Вы вошли`);
  }
}
