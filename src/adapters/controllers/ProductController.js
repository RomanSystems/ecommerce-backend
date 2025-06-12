const CreateProduct = require('../../application/useCases/CreateProduct');
const GetAllProducts = require('../../application/useCases/GetAllProducts');
const ProductDTO = require('../../application/dtos/ProductDTO');

class ProductController {
  constructor(productRepository) {
    this.createProduct = new CreateProduct(productRepository);
    this.getAllProducts = new GetAllProducts(productRepository);
  }

  async create(req, res) {
    try {
      console.log('>>> Request body:', req.body);
      const product = await this.createProduct.execute(req.body);
      res.status(201).json(new ProductDTO(product));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      console.log('>>> Fetching all products from controller');
      const products = await this.getAllProducts.execute();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

}

module.exports = ProductController;