// import express
const express = require('express');

// variables de entorno
const config = require('./config');
console.log('>>> Config leída:', config);

// repositorio MongoDB
const MongoProductRepository = require('./infraestructure/repositories/MongoDB/MongoProductRepository');
const MongoClientRepository = require('./infraestructure/repositories/MongoDB/MongoClientRepository');

// repositorio MySQL
const MySQLProductRepository = require('./infraestructure/repositories/MySQL/MySQLProductRepository');
const MySQLClientRepository = require('./infraestructure/repositories/MySQL/MySQLClientRepository');

// controllers
const ProductController = require('./adapters/controllers/ProductController');
const ClientController = require('./adapters/controllers/ClientController');
// import rutas
const productRoutes = require('./adapters/routes/productRoutes');
const clientRoutes = require('./adapters/routes/clientRoutes');

const { verifyToken } = require('./adapters/middlewares/authJwt');

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./infraestructure/docs/swaggerConfig');

const app = express();
const port = config.port;

// Dependencies
const dbType = config.DB_TYPE || 'mongodb'; // 'mongo' o 'mysql'
let productRepository;
let clientRepository;
console.log('>>> DB_TYPE:', dbType);
if (dbType === 'mysql') {
  productRepository = new MySQLProductRepository();
  clientRepository = new MySQLClientRepository();
} else {
  productRepository = new MongoProductRepository();
  clientRepository = new MongoClientRepository();
}

const productController = new ProductController(productRepository);
const clientController = new ClientController(clientRepository);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Configuración de Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// Routes
app.use('/api/v1/products', verifyToken, productRoutes(productController));
app.use('/api/v1/clients', verifyToken, clientRoutes(clientController));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// Start Server
app.listen(port, () => {
  console.log(`E-commerce server running on port http://localhost:${port}`);
});



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://roman:<db_password>@clusterroman.qyjqsnk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterRoman";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
