import BusinessValidationError from '../../../complements/exceptions/BusinessValidationError';
import { UsersRepo } from '../../users/users.repo';
import { leanUser } from '../../users/users.methods';
import msg from '../../../utils/msg';
import { simpleProjection } from '../../../utils/shared/aggegationHelpers';
import { ee, events } from '../../../lib/core/EventEmitter';

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

export const tokenConfirmationSender = async (email: string) => {
  const user = await verifyBusinessRules(email);
  const confirmationToken = await UsersRepo.tokenGenerator('confirmationToken');
  const updatedUser = await UsersRepo.updateById(user.id, {
    'userContext.confirmationToken': confirmationToken,
  });
  ee.emit(events.GET_CONFIRMATION_TOKEN_EVENT, leanUser(updatedUser));
};
