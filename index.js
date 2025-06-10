// importamos el framework de express
import express from 'express';

// Instanciamos en una variable
const app = express();

//definimos un puerto
const port = 3000;

import productRouter from './routes/product.js'
import client from "./routes/client.js";
import sales from "./routes/sales.js";
// const productRouter = express.Router();

app.use(express.json());
app.use('/product', productRouter);
app.use('/client', client);
app.use('/sales', sales);

// una ruta
app.get('/', function (req, res) {
    return res.send('Bienvenidos al Ecommerce!');
})

app.listen(port, function () {
    return console.log(`Servidor corriendo en maquina loca en el puerto ${port}`);
});