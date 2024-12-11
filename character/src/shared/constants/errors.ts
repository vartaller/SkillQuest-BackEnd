export const ERRORS = {
  FILE: {
    INVALID_FORMAT: 'Invalid file format',
    EMPTY_FILE: 'Fle is empty',
    UPLOAD_ERROR: 'Upload error',
  },
  USER: {
    PASSWORD:
      'The password must contain from 8 to 64 characters, must include 2 letters (at least 1 uppercase and one lowercase), numbers and special characters!',
    CHANGE_PASSWORD_ERROR: 'You can only change your password!',
    NOT_EXIST: 'User does not exist',
    ALREADY_EXIST: 'User already exist!',
  },
  AUTH: {
    WRONG_CREDENTIALS: 'Wrong credentials provided!',
    ACCOUNT_DELETED: 'Your account was deleted!',
    NO_ACCESS_TOKEN: 'No access token!',
  },
  GENERAL: {
    INCORRECT_LENGTH: 'Incorrect length',
    NOT_EXIST: 'No such field in this table',
    EMPTY: 'Your dataset to save is empty',
  },
  FILTER: {
    WRONG_COLUMN: 'Incorrect column value',
  },
};
