import 'reflect-metadata';
import {Body, CurrentUser, Get, JsonController, Param, Patch, Put} from 'routing-controllers';

import {UserDto} from '../types/user-dto';
import {UserService} from '../service/user-service';

@JsonController('/user')
export class UserController {
  private readonly userService: UserService = new UserService();

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get('/profile')
  getProfile(@CurrentUser({required: true}) id: number) {
    return this.userService.getOne(id);
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getOne(+id);
  }

  @Put()
  updateUser(@CurrentUser({required: true}) id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @Patch('/subscribe/:channelId')
  subscribeToChannel(@CurrentUser({required: true}) id: number, @Param('channelId') channelId: string) {
    return this.userService.subscribe(id, +channelId);
  }
}
