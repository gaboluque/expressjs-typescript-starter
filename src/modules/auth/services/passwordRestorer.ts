import { leanUser } from '../../users/users.methods';
import { UsersRepo } from '../../users/users.repo';
import ForbiddenError from '../../../complements/exceptions/ForbiddenError';
import encryptionGenerator from '../../../utils/shared/utilServices/encryptionGenerator';
import { ee, events } from '../../../lib/core/EventEmitter';

interface IPasswordRestorerParams {
  password: string;
  restorePasswordToken: string;
}

export default async ({ password, restorePasswordToken }: IPasswordRestorerParams) => {
  const newPassword = await encryptionGenerator(password);

  const user = await UsersRepo.restorePasswordByPasswordToken(restorePasswordToken, newPassword);

  if (!user) throw new ForbiddenError();

  ee.emit(events.PASSWORD_RESET_EVENT, user);

  return leanUser(user);
};
