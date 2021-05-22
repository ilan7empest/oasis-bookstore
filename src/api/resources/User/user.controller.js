const User = require('./user.model');
const {
  setTokenCookie,
  setRefreshToken,
  getRefreshTokens,
} = require('../../helpers/auth.token');
const HttpError = require('../../helpers/http-error');

const expiresIn = 1 * 60 * 60 * 24 * 7; //expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"

module.exports = {
  getUsers: async (req, res, next) => {
    let users;
    try {
      users = await User.find({}, '-password');
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
  },
  signup: async (req, res, next) => {
    let validBody;
    // Validate body

    try {
      validBody = await User.validateSignup(req.body);
    } catch (err) {
      return next(new HttpError(err, 422));
    }

    // Check if username exists
    let usernameBool = false;
    try {
      usernameBool = await User.doesUsernameExist(validBody.username);
    } catch (err) {
      return next(
        new HttpError('Signing up failed, please try again later.', 500)
      );
    }

    if (usernameBool) {
      return next(new HttpError('Username already exists', 422));
    }

    // Check if email exists
    let emailBool = false;
    try {
      emailBool = await User.doesEmailExist(validBody.email);
    } catch (err) {
      return next(
        new HttpError('Signing up failed, please try again later.', 500)
      );
    }
    if (emailBool) {
      return next(new HttpError('Email already exists', 422));
    }

    // Hash Password
    const hashedPassword = await User.hashPassword(validBody.password);
    console.log(validBody);
    const user = new User({
      ...validBody,
    });
    user.password = hashedPassword;
    // Save user to DB
    try {
      await user.save();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }

    const { username, id, isAdmin } = user;

    // Set JWT Token to cookie
    try {
      setTokenCookie(res, { username, id }, expiresIn);
    } catch (err) {
      const error = new HttpError(
        'Signup failed, please try again later.',
        500
      );
      return next(error);
    }

    // set refresh Token
    const refresh_token = setRefreshToken(username);

    // res.status(201).json({ user: user.toObject({ getters: true }) });
    res.status(201).json({
      refresh_token,
      username,
      userID: id,
      isAdmin,
    });
  },
  login: async (req, res, next) => {
    let validBody;
    // Validate body
    try {
      validBody = await User.validateLogin(req.body);
    } catch (err) {
      return next(new HttpError(err, 422));
    }

    // Find User Doc in DB
    let existingUser;
    try {
      existingUser = await User.findOne({ email: validBody.email });
    } catch (err) {
      const error = new HttpError(
        'Loggin failed, please try again later.',
        500
      );
      return next(error);
    }

    // return error if User doc not found
    if (!existingUser) {
      return next(
        new HttpError('Invalid credentials, could not log you in.', 403)
      );
    }

    // Compare passwords
    let passwordMatch = false;
    try {
      passwordMatch = await existingUser.comparePassword(
        validBody.password,
        existingUser.password
      );
    } catch (err) {
      const error = new HttpError(
        'Could not log you in, please check your credentials and try again.',
        500
      );
      return next(error);
    }

    // return error if pasword doesn't match
    if (!passwordMatch) {
      return next(
        new HttpError('Invalid password, could not log you in.', 400)
      );
    }

    // Set JWT Token to cookie
    const { username, id, isAdmin } = existingUser;
    try {
      setTokenCookie(res, { username, id }, expiresIn);
    } catch (err) {
      const error = new HttpError(
        'Loggin failed, please try again later.',
        500
      );
      return next(error);
    }

    // set refresh Token
    const refresh_token = setRefreshToken(username);
    return res.status(200).json({
      refresh_token,
      isAdmin,
      username,
      userID: id,
    });
  },
  token: async (req, res, next) => {
    const { refresh_token, username, userid } = req.headers;
    const token = refresh_token;
    const refreshTokens = getRefreshTokens();
    if (token in refreshTokens && refreshTokens[token] == username) {
      try {
        setTokenCookie(res, { username, id: userid }, expiresIn);
      } catch (err) {
        const error = new HttpError('Faild to refresh token.', 500);
        return next(error);
      }

      const token = setRefreshToken(username);
      return res.status(201).json({ refresh_token: token });
    } else {
      return res.status(401).json({ message: 'Wrong Token', token: false });
      // return next(new HttpError('Wrong Token', 403));
    }
  },
  logout: (req, res, next) => {
    // cookie = req.cookies;
    res.cookie('token', '', { expiresIn: 0 });
    res.status(200).json({ message: 'logged out' });
  },
};
