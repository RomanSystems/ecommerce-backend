import router from 'express';
import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.send('lista de todos los productos');
})
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`producto con id ${id}`);
})

module.exports = router;
export default router;