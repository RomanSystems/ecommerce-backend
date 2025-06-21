const { Router } = require('express');
const AuthController = require('../controllers/AuthController');

module.exports = (signInUseCase, refreshTokenUseCase) => {
  const router = Router();
  const controller = new AuthController(signInUseCase, refreshTokenUseCase);

  // POST /api/v1/auth/signin
   /**
   * @swagger
   * tags:
   *   name: Authentication
   *   description: Endpoints de autenticación
   */

  /**
   * @swagger
   * /api/v1/auth/signin:
   *   post:
   *     summary: Iniciar sesión
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Login exitoso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   *       401:
   *         description: Credenciales inválidas
   */
  router.post('/signin', controller.signIn.bind(controller));

  // POST /api/v1/auth/refresh-token
  // Refreshes the JWT token using a refresh token

  /**
   * @swagger
   * tags:
   *   name: Refresh Token
   *   description: Endpoints de refresco de token
   */

  /**
   * @swagger
   * /api/v1/auth/refresh-token:
   *   post:
   *     summary: Refrescar token
   *     description: Refresca el token JWT utilizando un refresh token
   *     tags: [Refresh Token]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RefreshTokenRequest'
   *     responses:
   *       200:
   *         description: Token refrescado exitosamente
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RefreshTokenResponse'
   *       400:
   *         description: Solicitud inválida
   *       401:
   *         description: Credenciales inválidas
   */
  router.post('/refresh-token', controller.refreshToken.bind(controller));

  return router;
};
