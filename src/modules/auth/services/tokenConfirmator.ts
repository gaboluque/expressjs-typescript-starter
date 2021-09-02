import { UsersRepo } from '../../users/users.repo';
import { IUserContext } from '../../users/users.types';
import { createJWT, leanUser } from '../../users/methods/userMethods';
import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import msg from '../../../utils/msg';

export const tokenConfirmator = async ({ confirmationToken }: IUserContext) => {
  const user = await UsersRepo.confirmUserToken(confirmationToken);
  if (!user) throw new BusinessValidationError(msg.USER_NOT_FOUND);
  const token = await createJWT(user);

  return { user: leanUser(user), token };
};
