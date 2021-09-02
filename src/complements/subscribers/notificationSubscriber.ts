import { EmailSender } from '../notifiers/EmailSender/EmailSender';
import { IUser } from '../../modules/users/users.types';
import { ee, events } from '../../lib/core/EventEmitter';

ee.on(events.GET_CONFIRMATION_TOKEN_EVENT, async (user: IUser, callback: any) => {
  EmailSender.sendConfirmationEmail(user, callback);
});

ee.on(events.USER_SIGN_UP_EVENT, async (user: IUser, callback: any) => {
  EmailSender.sendConfirmationEmail(user, callback);
});

ee.on(events.PASSWORD_RECOVERY_EVENT, (user: IUser) => {
  EmailSender.sendRecoverPasswordToken(user);
});

ee.on(events.PASSWORD_RESET_EVENT, (user: IUser) => {
  EmailSender.sendPasswordReset(user);
});
