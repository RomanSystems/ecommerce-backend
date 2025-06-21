const Order = require('../../domain/entities/Order');

class CreateOrder {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderData) {
    console.log('>>> CreateOrder.execute:', orderData);
    const order = new Order(orderData);
    console.log('>>> Order created:', order);
    // Aquí podrías agregar lógica adicional, como validaciones o transformaciones
    return await this.orderRepository.create(order);
  }
}

module.exports = CreateOrder;