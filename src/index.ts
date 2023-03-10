import * as path from 'path';
import dotenv from 'dotenv';
import {createExpressServer} from 'routing-controllers';
import serveStatic from 'serve-static';

dotenv.config();

import {UserController} from './controller/user-controller';
import {SubscriptionsController} from './controller/subscriptions-controller';

const PORT = process.env.PORT || 9000;

const app = createExpressServer({
  cors: true,
  controllers: [UserController, SubscriptionsController],
  routePrefix: '/api',
});

app.use(serveStatic(path.join(__dirname, 'static/video')));
app.use(serveStatic(path.join(__dirname, 'static/thumbnail')));
app.use(serveStatic(path.join(__dirname, 'static/avatar')));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
