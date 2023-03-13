import {
  BodyParam,
  CurrentUser,
  JsonController,
  Param,
  Post,
} from 'routing-controllers';

import {CommentService} from '../service/comment-service';

@JsonController('/comment')
export class CommentController {
  private readonly commentService: CommentService = new CommentService();

  @Post('/:id')
  async create(
    @Param('id') videoId: number,
    @CurrentUser({required: true}) {id},
    @BodyParam('message') message: string,
  ) {
    return this.commentService.create(id, videoId, message);
  }
}
