import { IAuthData } from '../../../modules/auth/auth.types';
import { nodeEnv } from '../../../config';

export default (user: IAuthData, token: string) => ({
  token,
  env: nodeEnv,
  ...user,
});
