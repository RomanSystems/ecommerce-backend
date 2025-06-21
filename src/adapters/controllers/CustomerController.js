const CreateCustomer = require('../../application/useCases/CreateCustomer');
const GetAllCustomers = require('../../application/useCases/GetAllCustomers');
const CustomerDTO = require('../../application/dtos/CustomerDTO');

class CustomerController {
  constructor(customerRepository) {
    this.createCustomer = new CreateCustomer(customerRepository);
    this.getAllCustomers = new GetAllCustomers(customerRepository);
  }

  async create(req, res) {
    try {
      console.log('>>> Request body:', req.body);
      const customer = await this.createCustomer.execute(req.body);
      res.status(201).json(new CustomerDTO(customer));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const customers = await this.getAllCustomers.execute();
      res.status(200).json(customers);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving customers' });
    }
  }

}

module.exports = CustomerController;