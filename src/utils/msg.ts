const msg = {
  /* AUTH */
  SIGN_UP_SUCCESS: 'successfulSignUp',
  LOG_IN_SUCCESS: 'successfulLogIn',
  CONFIRMATION_EMAIL_SENT: 'confirmationEmailSent',
  RECOVER_PASSWORD_EMAIL_SENT: 'recoverPasswordEmailSent',
  RESET_PASSWORD_SUCCESS: 'successResetPassword',
  REQUIRED_RESTORE_PASSWORD_TOKEN: 'requiredRestorePasswordToken',
  EXISTING_USER_EMAIL: 'existingEmailUser',
  NO_MATCHING_EMAIL_USER: 'noMatchingEmailUser',
  INVALID_CREDENTIALS: 'invalidCredentials',
  UNCONFIRMED_EMAIL: 'unconfirmedEmail',
  EMAIL_ALREADY_CONFIRMED: 'emailAlreadyConfirmed',

  /* USERS */
  USER_NOT_FOUND: 'userNotFound',
  REQUIRED_PASSWORD: 'userRequiredPassword',
  PASSWORD_MIN_LENGTH_7: 'userPasswordMinLength7',
  REQUIRED_ID: 'userRequiredId',
  REQUIRED_EMAIL: 'userRequiredEmail',
  INVALID_EMAIL: 'userInvalidEmail',
  USER_REQUIRED_NAME: 'userRequiredName',
  USER_NAME_MIN_LENGTH_2: 'userNameMinLength2',
  USER_NAME_MAX_LENGTH_30: 'userNameMaxLength30',
  USER_NAME_LENGTH_2_TO_30: 'userNameLength2to30',
  UPDATE_USER_OWN_DATA_SUCCESS: 'successUserOwnDataUpdate',

  /* VALIDATIONS */
  INVALID_ID: 'invalidId',
  INVALID_TOKEN: 'invalidToken',

  INVALID_PAGE: 'invalidPage',
  INVALID_LIMIT: 'invalidLimit',
  INVALID_FILTERS: 'invalidFilters',
  INVALID_SORTING: 'invalidSorting',

  /* ERRORS */
  SERVER_DB_ERROR: 'serverDBError',
  EXCEEDED_PERMITTED_FILES: 'exceededPermittedFiles',
  UNAUTHORIZED_ERROR: 'UnauthorizedError',
  SERVER_ERROR: 'ServerError',
  NOT_FOUND_ERROR: 'NotFoundError',
  FORBIDDEN_ERROR: 'ForbiddenError',
  TOKEN_GENERATOR_NO_FIELD_ERROR: 'tokenGeneratorNoFieldError',
};

export default msg;
