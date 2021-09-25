import bcrypt from 'bcryptjs';
import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import { createJWT, leanUser } from '../../users/users.methods';
import msg from '../../../utils/msg';
import { IAuth, IUserContext, IUserDoc } from '../../users/users.types';
import { UsersRepo } from '../../users/users.repo';

const badAuthError = () => {
  throw new BusinessValidationError(msg.INVALID_CREDENTIALS);
};

const verifyCredentials = async (user: IUserDoc, password: string) => {
  const isMatch = await bcrypt.compare(password, user.password!);
  if (!isMatch) badAuthError();
};

const verifyUserContext = async ({ confirmedAt }: IUserContext) => {
  if (!confirmedAt) throw new BusinessValidationError(msg.UNCONFIRMED_EMAIL);
};

export const sessionCreator = async ({ email, password }: IAuth) => {
  const user = await UsersRepo.findOne({ email });

  if (!user) {
    throw new BusinessValidationError(msg.INVALID_CREDENTIALS);
  } else {
    await verifyCredentials(user, password);
    await verifyUserContext(user.userContext);

    const token = createJWT(user);

    return { user: leanUser(user), token };
  }
};
