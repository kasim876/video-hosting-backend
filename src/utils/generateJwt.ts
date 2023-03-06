import jwt from 'jsonwebtoken';

interface IUser {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

export const generateJwt = (user: IUser) => {
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
