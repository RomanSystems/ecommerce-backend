class GetAllProduct {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute() {
    console.log('>>> Retrieving all products from use case');
    const products = await this.productRepository.getAll();
    console.log('Products retrieved from use case:', products);
    return products;
  }
}

module.exports = GetAllProduct;