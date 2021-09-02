import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import notificationSubscriber, {
  TOKEN_CONFIRMATION_NOTIFICATION,
} from '../../../complements/subscribers/notificationSubscriber';
import { UsersRepo } from '../../users/users.repo';
import msg from '../../../utils/msg';
import { simpleProjection } from '../../../utils/shared/aggegationHelpers';

const verifyBusinessRules = async (email: string) => {
  const user = await UsersRepo.findOne(
    { email },
    simpleProjection('name lastName email userContext')
  );
  if (!user) throw new BusinessValidationError(msg.USER_NOT_FOUND);
  if (user.userContext.confirmedAt) {
    throw new BusinessValidationError(msg.EMAIL_ALREADY_CONFIRMED);
  }

  return user;
};

export const tokenConfirmationSender = async ({ email }: { email: string }) => {
  const user = await verifyBusinessRules(email);
  const confirmationToken = await UsersRepo.tokenGenerator('confirmationToken');
  const updatedUser = await UsersRepo.updateById(user.id, {
    'userContext.confirmationToken': confirmationToken,
  });
  notificationSubscriber.emit(TOKEN_CONFIRMATION_NOTIFICATION, updatedUser);
};
