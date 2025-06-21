const express = require('express');
const router = express.Router();

module.exports = (customerController) => {
  /**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Gestión de clientes
 */

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerResponse'
 */
  router.get('/', (req, res) => customerController.getAll(req, res));

  /**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerRequest'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerResponse'
 *       400:
 *         description: Solicitud inválida
 */
  router.post('/', (req, res) => customerController.create(req, res));

  return router;
};