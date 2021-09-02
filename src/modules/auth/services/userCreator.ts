import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import notificationSubscriber, {
  TOKEN_CONFIRMATION_NOTIFICATION,
} from '../../../complements/subscribers/notificationSubscriber';
import { UsersRepo } from '../../users/users.repo';
import msg from '../../../utils/msg';
import { IUser, IUserDoc, IUserDTO } from '../../users/users.types';
import { UserModel } from '../../users/users.model';
import { leanUser } from '../../users/methods/userMethods';
import encryptionGenerator from '../../../utils/shared/utilServices/encryptionGenerator';
import { userContextCreator } from './userContextCreator';

const verifyBusinessRules = async ({ email }: IUserDTO) => {
  const foundUser = await UsersRepo.findOne({ email }, { _id: 1 });
  if (foundUser) throw new BusinessValidationError(msg.EXISTING_USER_EMAIL);
};

const sendConfirmationEmail = (user: IUserDoc) => {
  notificationSubscriber.emit(TOKEN_CONFIRMATION_NOTIFICATION, user, async () => {
    await UsersRepo.updateById(user._id, {
      'userContext.confirmationSentAt': new Date(),
    });
  });
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
  sendConfirmationEmail(user);

  await user.save();

  return leanUser(user.toObject() as IUser);
};
