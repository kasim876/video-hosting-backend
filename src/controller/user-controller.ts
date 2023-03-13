import 'reflect-metadata';
import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Patch,
  Put,
} from 'routing-controllers';

import {UserDto} from '../types/user-dto';
import {UserService} from '../service/user-service';

@JsonController('/user')
export class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get('/profile')
  async getProfile(@CurrentUser({required: true}) {id}) {
    return this.userService.getOne(id);
  }

  @Put()
  async updateUser(@CurrentUser({required: true}) {id}, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @Patch('/subscribe/:channelId')
  async subscribeToChannel(
    @CurrentUser({required: true}) {id},
    @Param('channelId') channelId: number,
  ) {
    return this.userService.subscribe(id, channelId);
  }
}
