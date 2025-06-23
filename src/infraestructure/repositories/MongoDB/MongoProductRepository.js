const ProductRepository = require('../../../domain/repositories/ProductRepository');
const ProductModel = require('../../database/models/ProductModel');
const Product = require('../../../domain/entities/Product');

class MongoProductRepository extends ProductRepository {
  async getAll() {
    console.log('>>> Retrieving all products from MongoDB');
    const products = await ProductModel.find();
    console.log('Products retrieved from MongoDB:', products);
    return products.map(p => new Product(p.toObject()));
  }

  async create(product) {
    const newProduct = await ProductModel.create(product);
    return new Product(newProduct.toObject());
  }

  async getPaginated(page, limit) {
    console.log(`>>> Retrieving products from MongoDB with pagination: page ${page}, limit ${limit}`);
    const products = await ProductModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    console.log('Paginated products retrieved from MongoDB:', products);
    return products.map(p => new Product(p.toObject()));
  }
}

module.exports = MongoProductRepository;