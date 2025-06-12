const jwt = require('jsonwebtoken');
const config = require('../../config');

class TokenGenerator {
  generate(payload) {
    return jwt.sign({ id: payload.id, roles: payload.roles }, config.jwtSecret, { expiresIn: payload.expiresIn });
  }

  generateRefresh(payload) {
    return jwt.sign({ id: payload.id, roles: payload.roles }, config.jwtSecret, { expiresIn: payload.expiresIn });
  }

  verify(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  verifyRefresh(token) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}

module.exports = TokenGenerator;