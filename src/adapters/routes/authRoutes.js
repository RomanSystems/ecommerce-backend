const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

module.exports = (signInUseCase) => {
  const router = Router();
  const controller = new AuthController(signInUseCase);

  // POST /api/v1/auth/signin
  router.post('/signin', controller.signIn.bind(controller));

  // POST /api/v1/auth/refresh-token
  // Refreshes the JWT token using a refresh token
  router.post('/refresh-token', controller.refreshToken.bind(controller));

  return router;
};
