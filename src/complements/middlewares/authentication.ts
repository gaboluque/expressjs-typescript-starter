import jsonwebtoken, { Secret } from 'jsonwebtoken';
import { NextFunction, RequestHandler, Response, Request } from 'express';
import UnauthorizedError from '../exceptions/UnauthorizedError';
import { UsersRepo } from '../../modules/users/users.repo';
import { mongoId } from '../../utils/commonUtils';
import { leanUser } from '../../modules/users/methods/userMethods';
import { authConf } from '../../config';
import { UserModel } from '../../modules/users/users.model';
import { IUser } from '../../modules/users/users.types';

const publicUser = new UserModel({
  _id: mongoId().toString(),
  name: 'Public',
  lastName: 'Public',
  email: 'publicuser@bluu.com.co',
  phone: '0000000000',
  userContext: {},
});

const authentication: RequestHandler = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const auth = req.header ? req.header('Authorization') : null;
    if (auth) {
      const jwt = auth.replace('Bearer ', '');
      const jwtData = jsonwebtoken.verify(jwt, authConf.jwtSecret as Secret) as any;
      const user = await UsersRepo.findById(jwtData.id);
      if (user) {
        req.jwt = jwt;
        req.currentUser = user;
      }
    } else {
      req.currentUser = leanUser(publicUser as IUser);
    }
    next();
  } catch (e) {
    throw new UnauthorizedError();
  }
};

export default authentication;
