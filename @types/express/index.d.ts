import { IUser } from '../../src/modules/users/users.types';

declare global {
  namespace Express {
    interface Request {
      permittedParams: any;
      currentUser: IUser;
      jwt: string;
    }
  }
}
