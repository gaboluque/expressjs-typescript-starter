import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import { UsersRepo } from '../../users/users.repo';
import { leanUser } from '../../users/users.methods';
import msg from '../../../utils/msg';
import { IUser, IUserDTO } from '../../users/users.types';
import { UserModel } from '../../users/users.model';
import encryptionGenerator from '../../../utils/shared/utilServices/encryptionGenerator';
import { userContextCreator } from './userContextCreator';
import { ee, events } from '../../../lib/core/EventEmitter';

const verifyBusinessRules = async ({ email }: IUserDTO) => {
  const foundUser = await UsersRepo.findOne({ email }, { _id: 1 });
  if (foundUser) throw new BusinessValidationError(msg.EXISTING_USER_EMAIL);
};

const createUser = async ({ ...userDTO }: IUserDTO) => {
  const user = new UserModel(userDTO);
  user.userContext = await userContextCreator();
  user.password = await encryptionGenerator(userDTO.password);

  return user;
};

export const userCreator = async (userDTO: IUserDTO) => {
  await verifyBusinessRules(userDTO);
  const user = await createUser(userDTO);

  await user.save();

  ee.emit(events.USER_SIGN_UP_EVENT, user, async () => {
    await UsersRepo.updateById(user._id, {
      'userContext.confirmationSentAt': new Date(),
    });
  });

  return leanUser(user.toObject() as IUser);
};
