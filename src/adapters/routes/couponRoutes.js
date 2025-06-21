const express = require('express');
const router = express.Router();

module.exports = (couponController) => {
    /**
    * @swagger
    * tags:
    *   name: Coupons
    *   description: Gestión de cupones
    */

    /**
     * @swagger
     * /api/v1/coupons:
     *   get:
     *     summary: Obtiene todos los cupones
     *     tags: [Coupons]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de cupones
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/CouponResponse'
     *       401:
     *         description: No autorizado
     *       500:
     *         description: Error del servidor
     */

    router.get('/', (req, res) => couponController.getAll(req, res));

    /**
     * @swagger
     * /api/v1/coupons:
     *   post:
     *     summary: Crea un nuevo cupón
     *     tags: [Coupons]
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CouponRequest'
     *     description: Crea un nuevo cupón con los detalles proporcionados
     *     responses:
     *       201:
     *         description: Cupón creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/CouponResponse'
     *       422:
     *         description: Datos de cupón no válidos
     *       400:
     *         description: Datos de cupón inválidos
     *       401:
     *         description: No autorizado
     */
    router.post('/', (req, res) => couponController.create(req, res));

    return router;
};