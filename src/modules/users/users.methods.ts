import jwt from 'jsonwebtoken';
import { omit, pick } from 'lodash';
import { IUser, IUserDoc } from './users.types';
import { IAuthData } from '../auth/auth.types';
import { authConf } from '../../config';

// Lean user method used to remove password from responses
const leanUser = (user: IUser) => {
  const userObject = { ...user };
  userObject._id = user._id.toString();
  return omit(userObject, ['password', '__v']);
};

const authData = (user: IUser): IAuthData => {
  return pick(user, ['_id', 'email', 'name', 'userContext']);
};

const createJWT = (user: IUserDoc) => {
  return jwt.sign({ id: user._id }, authConf.jwtSecret, {
    expiresIn: '60 days',
  });
};

export { leanUser, createJWT, authData };
