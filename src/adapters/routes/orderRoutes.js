const express = require('express');
const router = express.Router();

module.exports = (orderController) => {
    /**
    * @swagger
    * tags:
    *   name: Orders
    *   description: Gestión de pedidos
    */

    /**
     * @swagger
     * /api/v1/orders:
     *   get:
     *     summary: Obtiene todos los pedidos
     *     tags: [Orders]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de pedidos
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/OrderResponse'
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error del servidor
     */

    router.get('/', (req, res) => orderController.getAll(req, res));
    
    /**
     * @swagger
     * /api/v1/orders:
     *   post:
     *     summary: Crea un nuevo pedido
     *     tags: [Orders]
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/OrderRequest'
     *     responses:
     *       201:
     *         description: Pedido creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/OrderResponse'
     *       400:
     *         description: Datos de pedido inválidos
     */
    router.post('/', (req, res) => orderController.create(req, res));

    return router;
};