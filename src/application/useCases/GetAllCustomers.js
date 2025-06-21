class GetAllCustomers{
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute() {
    console.log('>>> Retrieving all customers from use case');
    const customers = await this.customerRepository.getAll();
    console.log('Customers retrieved from use case:', customers);
    return customers;
  }
}

module.exports = GetAllCustomers;