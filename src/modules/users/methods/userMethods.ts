import jwt from 'jsonwebtoken';
import { NextFunction } from 'express';
import encryptionGenerator from '../../../utils/shared/utilServices/encryptionGenerator';
import { IUser, IUserDoc } from '../users.types';
import { IAuthData } from '../../auth/auth.types';
import { authConf } from '../../../config';

const leanUser = (user: IUser) => {
  const userObject = { ...user };
  userObject._id = user._id.toString();
  delete userObject.password;
  return userObject;
};

const authData = (user: IUser): IAuthData => {
  const { _id, email, name, userContext } = user;
  return {
    _id,
    email,
    name,
    userContext,
  };
};

const createJWT = (user: IUserDoc) => {
  return jwt.sign({ id: user._id }, authConf.jwtSecret, {
    expiresIn: '60 days',
  });
};

async function preSave(this: IUserDoc, next: NextFunction): Promise<void> {
  if (this.isModified('password')) {
    this.password = await encryptionGenerator(this.password);
  }

  next();
}

export { leanUser, preSave, createJWT, authData };
