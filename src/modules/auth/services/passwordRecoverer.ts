import { UsersRepo } from '../../users/users.repo';
import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import msg from '../../../utils/msg';

export default async (email: string) => {
  const restorePasswordToken = await UsersRepo.tokenGenerator('restorePasswordToken');

  const user = await UsersRepo.setRestorePasswordTokenByEmail(email, restorePasswordToken);

  if (!user) throw new BusinessValidationError(msg.NO_MATCHING_EMAIL_USER);

  return user;
};
