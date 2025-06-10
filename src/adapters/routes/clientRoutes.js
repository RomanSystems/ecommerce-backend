const express = require('express');
const router = express.Router();

module.exports = (clientController) => {
  /**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestión de clientes
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 */
  router.get('/', (req, res) => clientController.getAll(req, res));
  router.post('/', (req, res) => clientController.create(req, res));

  return router;
};