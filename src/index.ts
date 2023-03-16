import * as path from 'path';
import dotenv from 'dotenv';
import {Action, createExpressServer} from 'routing-controllers';
import serveStatic from 'serve-static';
import jwt, {JwtPayload} from 'jsonwebtoken';

dotenv.config();

import {AuthController} from './controller/auth-controller';
import {UserController} from './controller/user-controller';
import {VideoController} from './controller/video-controller';
import {CommentController} from './controller/comment-controller';

const PORT = process.env.PORT || 9000;

const app = createExpressServer({
  cors: true,
  controllers: [AuthController, UserController, VideoController, CommentController],
  routePrefix: '/api',
  currentUserChecker: async (action: Action) => {
    const token = action.request.headers.authorization.split(' ')[1];

    const user: any = jwt.verify(token, process.env.JWT_SECRET);

    return user.id;
  },
});

app.use(serveStatic(path.join(__dirname, 'static/video')));
app.use(serveStatic(path.join(__dirname, 'static/thumbnail')));
app.use(serveStatic(path.join(__dirname, 'static/avatar')));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
