export const TOKEN_TYPES = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

export const REGEX = {
  PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,64}$/,
};

export const PASSWORD = {
  NUMS: '0123456789',
  LOWER_CASE: 'abcdefghijklmnopqrstuvwxyz',
  UPPER_CASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  SPEC_CHARS: '@$!%*?&',
};

export const EMAIL = {
  SUBJECT: 'Data POC',
  CREDENTIALS: 'Your login details:',
  PASSWORD_CHANGED: 'Your password has been successfully updated!',
};

export const URLS = {
  PEDESTRIAN: 'pedestrianBicyclist',
  CRASH: 'crash',
  TRAFFIC: 'traffic',
};
