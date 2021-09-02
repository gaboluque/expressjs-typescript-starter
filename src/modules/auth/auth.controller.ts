import { Response, Request } from 'express';
import { Post, Controller, Sanitize, Get, Authenticate, Put } from '../../lib/core/decorators';
import responseFormatter from '../../complements/helpers/templates/responseFormatter';
import msg from '../../utils/msg';
import { confirmTokenValidator, loginValidator } from './auth.validators';
import {
  tokenConfirmationSender,
  sessionCreator,
  tokenConfirmator,
  tokenVerifier,
  userCreator,
} from './auth.services';
import sessionTemplate from '../../complements/helpers/templates/sessionTemplate';
import { emailValidator, resetPasswordValidator, userValidator } from '../users/users.validators';
import { authData } from '../users/methods/userMethods';
import passwordRecoverer from './services/passwordRecoverer';
import notificationSubscriber, {
  PASSWORD_RECOVERY_NOTIFICATION,
  PASSWORD_RESET_NOTIFICATION,
} from '../../complements/subscribers/notificationSubscriber';
import passwordRestorer from './services/passwordRestorer';
import { IUser } from '../users/users.types';

@Controller('')
export class AuthController {
  @Post('/sign-up')
  @Sanitize(userValidator)
  public async signUp({ permittedParams }: Request, res: Response) {
    const user = await userCreator(permittedParams!);
    res.status(201).send(responseFormatter(user, msg.SIGN_UP_SUCCESS));
  }

  @Post('/log-in')
  @Sanitize(loginValidator)
  public async logIn({ permittedParams }: Request, res: Response) {
    const { user, token } = await sessionCreator(permittedParams);
    res
      .status(200)
      .send(responseFormatter(sessionTemplate(authData(user as IUser), token), msg.LOG_IN_SUCCESS));
  }

  @Post('/verify-token')
  @Authenticate
  public async verifyToken({ currentUser, jwt }: Request, res: Response) {
    const session = await tokenVerifier(currentUser, jwt);
    res.status(200).send(responseFormatter(session));
  }

  @Post('/email-confirmation')
  @Sanitize(confirmTokenValidator)
  public async confirmEmail({ permittedParams }: Request, res: Response) {
    const { user, token } = await tokenConfirmator(permittedParams);
    res
      .status(200)
      .send(responseFormatter(sessionTemplate(authData(user as IUser), token), msg.LOG_IN_SUCCESS));
  }

  @Get('/email-confirmation')
  @Sanitize(emailValidator)
  public async resendToken({ permittedParams }: Request, res: Response) {
    await tokenConfirmationSender(permittedParams);
    res.status(200).send(responseFormatter(null, msg.CONFIRMATION_EMAIL_SENT));
  }

  @Post('/recover-password')
  @Sanitize(emailValidator)
  public async resetPassword({ permittedParams }: Request, res: Response) {
    const user = await passwordRecoverer(permittedParams.email);
    notificationSubscriber.emit(PASSWORD_RECOVERY_NOTIFICATION, user);
    res.status(200).send(responseFormatter(null, msg.RECOVER_PASSWORD_EMAIL_SENT));
  }

  @Put('/restore-password')
  @Sanitize(resetPasswordValidator)
  public async restorePassword({ permittedParams }: Request, res: Response) {
    const user = await passwordRestorer(permittedParams);
    notificationSubscriber.emit(PASSWORD_RESET_NOTIFICATION, user);
    res.status(200).send(responseFormatter(null, msg.RESET_PASSWORD_SUCCESS));
  }
}
