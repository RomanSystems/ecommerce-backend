const express = require('express');
const router = express.Router();

module.exports = (saleController) => {
  /**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Gestión de salees
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtiene todos los salees
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de salees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 */
  router.get('/', (req, res) => saleController.getAll(req, res));
  router.post('/', (req, res) => saleController.create(req, res));

  return router;
};