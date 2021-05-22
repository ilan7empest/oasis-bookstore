const passport = require('passport');
const JWTStrategy = require('passport-jwt');

const User = require('../resources/User/user.model');
const mongoose = require('mongoose');
require('dotenv').config();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies['token'];
  return token;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};
const configJWTStrategy = () => {
  passport.use(
    new JWTStrategy.Strategy(jwtOptions, async (payload, done) => {
      const expirationDate = new Date(payload.exp * 1000);
      try {
        let id = mongoose.Types.ObjectId(payload.id);
        const user = await User.findById(id, '_id username');
        if (!user || expirationDate < new Date()) {
          return done(null, false);
        }
        return done(null, { id: user._id, username: user.username });
      } catch (error) {
        done(error, false);
      }
    })
  );
};

module.exports = configJWTStrategy;
