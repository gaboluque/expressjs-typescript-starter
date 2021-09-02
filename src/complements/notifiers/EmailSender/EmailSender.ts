import nodemailer, { Transporter } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import options from './options';
import { IUser } from '../../../modules/users/users.types';
import logHandler, { mailError } from '../../subscribers/logSubscriber';
import { isFunction, isProduction } from '../../../utils/commonUtils';
import { frontUrl } from '../../../config';

type sendEmailProps = {
  to: string;
  subject: string;
  template: string;
  context: any;
  callback?: any;
};

const testTransport = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'ben.bayer@ethereal.email',
    pass: 'u1e4drjeywK498jTqr',
  },
};

export class EmailSender {
  private static provider: Transporter | any;

  private static inProd: boolean = isProduction();

  private static get instance() {
    if (!EmailSender.provider) {
      EmailSender.provider = nodemailer.createTransport(
        // Here we can change the production transport to SES or other
        this.inProd ? testTransport : testTransport
      );
      EmailSender.provider.use('compile', hbs(options));
    }
    return EmailSender.provider;
  }

  private static sendEmail(props: sendEmailProps) {
    EmailSender.instance.sendMail(
      {
        ...props,
        from: this.inProd ? 'info@bluu.com.co' : testTransport.auth.user,
        to: this.inProd ? props.to : testTransport.auth.user,
      },
      (err: Error) => {
        EmailSender.handleResponse(err, props.callback);
      }
    );
  }

  public static sendConfirmationEmail(user: IUser, callback?: any) {
    const targetUrl = EmailSender.targetCreator({
      path: '/confirm-token',
      query: 'confirmationToken',
      value: user.userContext.confirmationToken,
    });

    EmailSender.sendEmail({
      to: user.email,
      subject: `Confirma tu email ${user.name}`,
      template: 'confirmation',
      context: {
        name: user.name,
        targetUrl,
        confirmationToken: user.userContext.confirmationToken,
      },
      callback,
    });
  }

  public static sendRandomPassword(user: IUser, newPassword: string) {
    EmailSender.sendEmail({
      to: user.email,
      subject: `Contraseña provisional`,
      template: 'provisionalPassword',
      context: {
        name: user.name,
        newPassword,
      },
    });
  }

  public static sendRecoverPasswordToken(user: IUser) {
    const targetUrl = EmailSender.targetCreator({
      path: '/forgot-password',
      query: 'confirmationToken',
      value: user.userContext.restorePasswordToken,
    });

    EmailSender.sendEmail({
      to: user.email,
      subject: `Recuperar contraseña`,
      template: 'restorePassword',
      context: {
        name: user.name,
        token: user.userContext.restorePasswordToken,
        targetUrl,
      },
    });
  }

  public static sendPasswordReset(user: IUser) {
    EmailSender.sendEmail({
      to: user.email,
      subject: `Contraseña actualizada`,
      template: 'passwordReset',
      context: {
        name: user.name,
        targetUrl: frontUrl,
      },
    });
  }

  private static handleResponse(err: Error, callback: any) {
    if (err) {
      logHandler.emit('error', mailError(err));
    } else if (callback && isFunction(callback)) {
      callback();
    }
  }

  private static targetCreator({ path = '', query = '', value = '' }) {
    return `${frontUrl}${path}?${query}=${value}`;
  }
}
