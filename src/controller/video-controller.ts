import 'reflect-metadata';
import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  QueryParam,
} from 'routing-controllers';

import {VideoService} from '../service/video-service';
import {VideoDto} from '../types/video-dto';

@JsonController('/video')
export class VideoController {
  private readonly videoService: VideoService = new VideoService();

  @Get()
  async getAll(@QueryParam('search') query?: string) {
    return this.videoService.getAll(query);
  }

  @Get('/most-popular')
  async getMostPopular() {
    return this.videoService.getMostPopular();
  }

  @Post()
  async create(@CurrentUser({required: true}) {id}, @Body() dto: VideoDto) {
    return this.videoService.create(id, dto);
  }

  @Patch('/update-views/:id')
  async updateViews(@Param('id') id: number) {
    return this.videoService.updateCountViews(id);
  }

  @Patch('/update-likes/:id')
  async updateLikes(@Param('id') id: number) {
    return this.videoService.updateLikes(id);
  }
}
