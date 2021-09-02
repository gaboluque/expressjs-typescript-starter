import { UsersRepo } from '../../users/users.repo';
import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import { createJWT, leanUser } from '../../users/users.methods';
import msg from '../../../utils/msg';

export const tokenConfirmator = async (confirmationToken: string) => {
  const user = await UsersRepo.confirmUserToken(confirmationToken);
  if (!user) throw new BusinessValidationError(msg.USER_NOT_FOUND);
  const token = createJWT(user);

  return { user: leanUser(user), token };
};
