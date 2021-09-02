import { IUserContext } from '../users/users.types';

export interface IAuthData {
  _id: string;
  email: string;
  name: string;
  userContext: IUserContext;
}
