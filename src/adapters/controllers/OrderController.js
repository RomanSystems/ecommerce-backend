const CreateOrder = require('../../application/useCases/CreateOrder');
const GetAllOrders = require('../../application/useCases/GetAllOrders');
const OrderDTO = require('../../application/dtos/OrderDTO');

class OrderController {
  constructor(orderRepository) {
    this.createOrder = new CreateOrder(orderRepository);
    this.getAllOrders = new GetAllOrders(orderRepository);
  }

  async create(req, res) {
    try {
      console.log('>>> Request body:', req.body);
      const order = await this.createOrder.execute(req.body);
      res.status(201).json(new OrderDTO(order));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      console.log('>>> Fetching all orders from controller');
      const orders = await this.getAllOrders.execute();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

}

module.exports = OrderController;