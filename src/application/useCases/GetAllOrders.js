class GetAllOrders {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute() {
    console.log('>>> Retrieving all orders from use case');
    const orders = await this.orderRepository.getAll();
    console.log('Orders retrieved from use case:', orders);
    return orders;
  }
}

module.exports = GetAllOrders;