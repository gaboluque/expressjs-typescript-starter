import sessionTemplate from '../../../complements/helpers/templates/sessionTemplate';
import { IUser } from '../../users/users.types';
import { authData } from '../../users/methods/userMethods';

export const tokenVerifier = async (currentUser: IUser, jwt: string) => {
  const basicAuthData = await authData(currentUser);
  return sessionTemplate(basicAuthData, jwt);
};
