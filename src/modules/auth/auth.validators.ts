import { Schema } from 'express-validator';
import msg from '../../utils/msg';
import { tokenValidator } from '../../utils/shared/validatorHelpers';
import { emailValidator, passwordValidator } from '../users/users.validators';

export const loginValidator: Schema = {
  ...emailValidator,
  ...passwordValidator,
};

export const confirmTokenValidator: Schema = {
  confirmationToken: tokenValidator(msg.INVALID_TOKEN),
};
