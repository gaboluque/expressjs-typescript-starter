import { Schema } from 'express-validator';
import msg from '../../utils/msg';
import { existsValidator, lengthValidator } from '../../utils/shared/validatorHelpers';

export const emailValidator = {
  email: {
    exists: existsValidator(msg.REQUIRED_EMAIL),
    isEmail: { errorMessage: msg.INVALID_EMAIL },
  },
};

export const passwordValidator = {
  password: {
    exists: existsValidator(msg.REQUIRED_PASSWORD),
    isLength: { options: { min: 7 }, errorMessage: msg.PASSWORD_MIN_LENGTH_7 },
  },
};

export const resetPasswordValidator = {
  ...passwordValidator,
  restorePasswordToken: {
    exists: existsValidator(msg.REQUIRED_RESTORE_PASSWORD_TOKEN),
    isLength: lengthValidator({ min: 6, max: 6 }, 'Token inválido'),
  },
};

export const userValidator: Schema = {
  ...emailValidator,
  ...passwordValidator,
  name: {
    exists: existsValidator(msg.USER_REQUIRED_NAME),
    isLength: lengthValidator({ min: 2, max: 30 }, msg.USER_NAME_LENGTH_2_TO_30),
  },
};

export const userUpdateValidator: Schema = {
  email: {
    optional: true,
    isEmail: { errorMessage: msg.INVALID_EMAIL },
  },
  password: {
    optional: true,
    isLength: { options: { min: 7 }, errorMessage: msg.PASSWORD_MIN_LENGTH_7 },
  },
  name: {
    optional: true,
    isLength: lengthValidator({ min: 2, max: 30 }, msg.USER_NAME_LENGTH_2_TO_30),
  },
};

export const userOwnUpdateValidator: Schema = {
  password: {
    optional: true,
    isLength: { options: { min: 7 }, errorMessage: msg.PASSWORD_MIN_LENGTH_7 },
  },
  name: {
    optional: true,
    isLength: lengthValidator({ min: 2, max: 30 }, msg.USER_NAME_LENGTH_2_TO_30),
  },
};
