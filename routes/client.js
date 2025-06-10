// importamos el router
import { Router } from "express";

// instanciamos
const router = Router();

router.get('/', function (req, res) { 
    return res.send("pagina prinicipal de clientes");
});

router.get('/:id', function (req, res) {
    const {id} = req.params; 
    return res.send(`cliente con id ${id}`) ;
});

export default router;