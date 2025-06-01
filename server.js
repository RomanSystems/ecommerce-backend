import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import productRouter from './routes/product';
const productRouter = express.Router();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));
app.get('/products', productRouter);

app.get('/', (req, res) => {
    res.status(200).send('Bienvenidos');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})