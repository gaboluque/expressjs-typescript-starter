import { UsersRepo } from '../../users/users.repo';
import ForbiddenError from '../../../complements/exceptions/ForbiddenError';
import encryptionGenerator from '../../../utils/shared/utilServices/encryptionGenerator';

interface IPasswordRestorerParams {
  password: string;
  restorePasswordToken: string;
}

export default async ({ password, restorePasswordToken }: IPasswordRestorerParams) => {
  const newPassword = await encryptionGenerator(password);

  const user = await UsersRepo.restorePasswordByPasswordToken(restorePasswordToken, newPassword);

  if (!user) throw new ForbiddenError();

  return user;
};
