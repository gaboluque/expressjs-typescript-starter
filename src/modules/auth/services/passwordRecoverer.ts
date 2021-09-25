import { leanUser } from '../../users/users.methods';
import { UsersRepo } from '../../users/users.repo';
import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import msg from '../../../utils/msg';
import { ee, events } from '../../../lib/core/EventEmitter';

export default async (email: string) => {
  const restorePasswordToken = await UsersRepo.tokenGenerator('restorePasswordToken');

  const user = await UsersRepo.setRestorePasswordTokenByEmail(email, restorePasswordToken);
  if (!user) throw new BusinessValidationError(msg.NO_MATCHING_EMAIL_USER);

  ee.emit(events.PASSWORD_RECOVERY_EVENT, user);

  return leanUser(user);
};
