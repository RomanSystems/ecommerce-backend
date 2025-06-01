import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import productRouter from './routes/product';
import client from "./routes/client";
import sales from "./routes/sales";
const productRouter = express.Router();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));
app.use('/products', productRouter);
app.use('/products', client);
app.use('/products', sales);

app.get('/', (req, res) => {
    res.status(200).send('Bienvenidos');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})