import { authData } from '../../users/users.methods';
import sessionTemplate from '../../../complements/helpers/templates/sessionTemplate';
import { IUser } from '../../users/users.types';

export const tokenVerifier = async (currentUser: IUser, jwt: string) => {
  const basicAuthData = authData(currentUser);
  return sessionTemplate(basicAuthData, jwt);
};
