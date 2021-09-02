import events from 'events';
import { EmailSender } from '../notifiers/EmailSender/EmailSender';
import { IUser } from '../../modules/users/users.types';

const notificationSubscriber = new events.EventEmitter();

export const TOKEN_CONFIRMATION_NOTIFICATION = 'tokenConfirmation';
notificationSubscriber.on(TOKEN_CONFIRMATION_NOTIFICATION, async (user: IUser, callback: any) => {
  EmailSender.sendConfirmationEmail(user, callback);
});

export const PASSWORD_RECOVERY_NOTIFICATION = 'passwordRecovery';
notificationSubscriber.on(PASSWORD_RECOVERY_NOTIFICATION, (user: IUser) => {
  EmailSender.sendRecoverPasswordToken(user);
});

export const PASSWORD_RESET_NOTIFICATION = 'passwordReset';
notificationSubscriber.on(PASSWORD_RESET_NOTIFICATION, (user: IUser) => {
  EmailSender.sendPasswordReset(user);
});

export default notificationSubscriber;
