import jwt from 'jsonwebtoken';

import {IUser} from '../types/user';

const generateJwt = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    },
  );
};

export default generateJwt;
