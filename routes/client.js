import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.send('lista de clientes');
})
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`cliente con id ${id}`);
})

module.exports = router;
export default router;