const Joi = require('joi');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      min: 3,
      max: 30,
      required: true,
      unique: true,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      default: '',
    },
    password: {
      type: String,
      required: true,
      min: 6,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: false,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        required: true,
      },
    ],
    // token: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);

// Check Email Exit
UserSchema.statics.doesEmailExist = async (email) => {
  try {
    let existingEmail = await User.findOne({ email });
    return existingEmail ? true : false;
  } catch (err) {
    return err;
  }
};
// Check Username Exit
UserSchema.statics.doesUsernameExist = async (username) => {
  try {
    const existionUsername = await User.findOne({ username });
    return existionUsername ? true : false;
  } catch (err) {
    return err;
  }
};
// Hash Password
UserSchema.statics.hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(12);
  return await bcrypt.hash(password, salt);
};
// Compare Password
UserSchema.methods.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

// Validate Signup body
UserSchema.statics.validateSignup = (body) => {
  console.log(body);
  return new Promise((resolve, reject) => {
    const schema = Joi.object({
      username: Joi.string()
        .regex(/^[a-zA-Z0-9_@]*$/)
        .min(4)
        .max(30)
        .required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
      password: Joi.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/i
      ),
      isAdmin: Joi.boolean(),
    });
    const { value, error } = schema.validate(body);
    if (error && error.details) {
      return reject(error.details[0].message);
    } else {
      resolve(value);
    }
  });
};
// Validate Login body
UserSchema.statics.validateLogin = (body) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { value, error } = schema.validate(body);
    if (error && error.details) {
      reject(error.details[0].message);
    } else {
      resolve(value);
    }
  });
};
module.exports = User = mongoose.model('User', UserSchema);
