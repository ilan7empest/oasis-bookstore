var randtoken = require('rand-token');
const jwt = require('./jwt');

const token = (payload, expiresIn) => {
  return jwt.generateToken({ ...payload }, expiresIn);
};

const refreshTokens = {};

module.exports = {
  setTokenCookie: async (res, payload, expiresIn) => {
    try {
      await res.cookie('token', token(payload, expiresIn), {
        expires: new Date(Date.now() + expiresIn * 1000),
        secure: false, // set to true if your using https
        httpOnly: true,
      });
      return;
    } catch (err) {
      return err;
    }
  },
  setRefreshToken: (username) => {
    const refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken];
    refreshTokens[refreshToken] = username;
    return refreshToken;
  },
  getRefreshTokens: () => {
    return refreshTokens;
  },
};
