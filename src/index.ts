import {createExpressServer} from 'routing-controllers';
import dotenv from 'dotenv';

dotenv.config();

import {UserController} from './controller/user-controller';

const PORT = process.env.PORT || 9000;

const app = createExpressServer({
  cors: true,
  controllers: [UserController],
  routePrefix: '/api',
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
