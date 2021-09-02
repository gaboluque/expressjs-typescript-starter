import cryptoRandomString from 'crypto-random-string';
import LoggableError from '../../complements/exceptions/LoggableError';
import BaseRepo from '../../lib/core/BaseRepo';
import msg from '../../utils/msg';
import { UserModel } from './users.model';
import { simpleProjection } from '../../utils/shared/aggegationHelpers';

export const UsersRepo = {
  ...BaseRepo(UserModel),
  async usedToken(field: string, token: string) {
    const filter = {
      userContext: {
        [field]: token,
      },
    };
    const result = await this.find(filter, { _id: 1 }).limit(1);
    return result.length;
  },
  async tokenGenerator(field: string, length = 6, characters = '0123456789') {
    if (!field) {
      throw new LoggableError(
        msg.TOKEN_GENERATOR_NO_FIELD_ERROR,
        null,
        new Error('No field provided')
      );
    }

    let token = cryptoRandomString({ length, characters });
    const usedToken = await this.usedToken(field, token);

    if (usedToken) {
      token = await this.tokenGenerator(field, length, characters);
    }

    return token;
  },
  addReferred(userId: string, referredId: string) {
    return this.updateById(userId, {
      $addToSet: {
        'referralContext.referred': referredId,
      },
    });
  },
  setRestorePasswordTokenByEmail(email: string, restorePasswordToken: string) {
    return this.update({ email }, { 'userContext.restorePasswordToken': restorePasswordToken });
  },
  restorePasswordByPasswordToken(passwordToken: string, newPassword: string) {
    return this.update(
      { 'userContext.restorePasswordToken': passwordToken },
      {
        $unset: { 'userContext.restorePasswordToken': 1 },
        $set: { password: newPassword },
      }
    );
  },
  confirmUserToken(confirmationToken: string | undefined) {
    const update = {
      'userContext.confirmedAt': new Date(),
      $unset: { 'userContext.confirmationToken': 1 },
    };
    return this.update(
      { 'userContext.confirmationToken': confirmationToken },
      update,
      simpleProjection('_id name email lastName password role providerContext userContext')
    );
  },
};
