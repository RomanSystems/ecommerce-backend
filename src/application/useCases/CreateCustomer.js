const Customer = require('../../domain/entities/Customer');

class CreateCustomer {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(customerData) {
    const customer = new Customer(customerData);
    return await this.customerRepository.create(customer);
  }
}

module.exports = CreateCustomer;