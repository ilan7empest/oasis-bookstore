const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  generateToken: (payload, expiresIn) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  },
};
