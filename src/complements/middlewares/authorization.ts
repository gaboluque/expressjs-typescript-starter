import { NextFunction, Response, Request } from 'express';
import authentication from './authentication';
// import ForbiddenError from '../exceptions/ForbiddenError';

export default () => [
  authentication,
  (_req: Request, _res: Response, next: NextFunction) => {
    // Role based authorization
    // if (!roles.includes(currentUser.role)) throw new ForbiddenError();

    next();
  },
];
