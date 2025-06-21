// import express
const express = require('express');

// variables de entorno
const config = require('./config');
console.log('>>> Config leída:', config);

// repositorio MongoDB
const MongoProductRepository  = require('./infraestructure/repositories/MongoDB/MongoProductRepository');
const MongoCustomerRepository = require('./infraestructure/repositories/MongoDB/MongoCustomerRepository');
const MongoUserRepository     = require('./infraestructure/repositories/MongoDB/MongoUserRepository');
const MongoOrderRepository    = require('./infraestructure/repositories/MongoDB/MongoOrderRepository');
const MongoCouponRepository   = require('./infraestructure/repositories/MongoDB/MongoCouponRepository');

// repositorio MySQL
const MySQLProductRepository  = require('./infraestructure/repositories/MySQL/MySQLProductRepository');
const MySQLCustomerRepository = require('./infraestructure/repositories/MySQL/MySQLCustomerRepository');

// controllers
const ProductController       = require('./adapters/controllers/ProductController');
const CustomerController      = require('./adapters/controllers/CustomerController');
const OrderController         = require('./adapters/controllers/OrderController');
const CouponController        = require('./adapters/controllers/CouponController');
const UserController          = require('./adapters/controllers/UserController');

// import rutas
const productRoutes           = require('./adapters/routes/productRoutes');
const customerRoutes          = require('./adapters/routes/customerRoutes');
const orderRoutes             = require('./adapters/routes/orderRoutes');
const couponRoutes            = require('./adapters/routes/couponRoutes');
// Rutas de autenticación
const authRoutes              = require('./adapters/routes/authRoutes');
const userRoutes              = require('./adapters/routes/userRoutes');

// Middlewares
const { verifyToken }         = require('./adapters/middlewares/authJwt');
// Swagger
// Swagger UI
const swaggerUI               = require('swagger-ui-express');
const swaggerSpec             = require('./infraestructure/docs/swaggerConfig');

// Servicios
const PasswordHasher          = require('./infraestructure/services/PasswordHasher');
const TokenGenerator          = require('./infraestructure/services/TokenGenerator');

// Use Cases
const RefreshToken            = require('./application/useCases/RefreshToken');
const SignIn                  = require('./application/useCases/SignIn');
const SignUp                  = require('./application/useCases/SignUp');

const app = express();
const port = config.port;

// Dependencies
const dbType = config.DB_TYPE || 'mongodb'; // 'mongo' o 'mysql'
let productRepository;
let customerRepository;
let orderRepository;
let couponRepository;
console.log('>>> DB_TYPE:', dbType);
if (dbType === 'mysql') {
  productRepository = new MySQLProductRepository();
  customerRepository = new MySQLCustomerRepository();
  // orderRepository = new MySQLOrderRepository();
  // couponRepository = new MySQLCouponRepository();
} else {
  productRepository = new MongoProductRepository();
  customerRepository = new MongoCustomerRepository();
  orderRepository = new MongoOrderRepository();
  couponRepository = new MongoCouponRepository();
}

const productController = new ProductController(productRepository);
const customerController = new CustomerController(customerRepository);
const orderController = new OrderController(orderRepository);
const couponController = new CouponController(couponRepository);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// —– SETUP AUTH —–
const userRepo       = new MongoUserRepository();
const passwordHasher = new PasswordHasher();
const tokenGen       = new TokenGenerator();
const signInUseCase  = new SignIn(userRepo, passwordHasher, tokenGen);
const refreshTokenUseCase  = new RefreshToken(tokenGen);
app.use('/api/v1/auth', authRoutes(signInUseCase, refreshTokenUseCase));

// ——— SETUP SIGNUP ———
const signUpUseCase = new SignUp(userRepo, passwordHasher);
app.use('/api/v1/users',express.json(),userRoutes(signUpUseCase));

// Configuración de Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// Routes
app.use('/api/v1/products', verifyToken, productRoutes(productController));
app.use('/api/v1/customers', verifyToken, customerRoutes(customerController));
app.use('/api/v1/orders', verifyToken, orderRoutes(orderController));
app.use('/api/v1/coupons', verifyToken, couponRoutes(couponController));

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// Start Server
app.listen(port, () => {
  console.log(`E-commerce server running on port http://localhost:${port}`);
});



// const { MongoCustomer, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://roman:<db_password>@clusterroman.qyjqsnk.mongodb.net/?retryWrites=true&w=majority&appName=ClusterRoman";

// // Create a MongoCustomer with a MongoCustomerOptions object to set the Stable API version
// const customer = new MongoCustomer(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the customer to the server	(optional starting in v4.7)
//     await customer.connect();
//     // Send a ping to confirm a successful connection
//     await customer.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the customer will close when you finish/error
//     await customer.close();
//   }
// }
// run().catch(console.dir);
