class OrderDTO {
  constructor(order) {
    this.id = order._id;
    this.user = order.user;
    this.items = order.items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));
    this.coupon = order.coupon;
    this.subtotal = order.subtotal;
    this.discount = order.discount;
    this.tax = order.tax;
    this.shippingCost = order.shippingCost;
    this.totalAmount = order.totalAmount;
    this.status = order.status;
    this.paymentMethod = order.paymentMethod;
    this.shippingAddress = order.shippingAddress;
    this.createdAt = order.createdAt;
  }
}

module.exports = OrderDTO;

// function orderToDTO(order) {
//   return {
//     id: order._id,
//     user: order.user,
//     items: order.items.map(item => ({
//       product: item.product,
//       quantity: item.quantity,
//       unitPrice: item.unitPrice
//     })),
//     subtotal: order.subtotal,
//     discount: order.discount,
//     tax: order.tax,
//     shippingCost: order.shippingCost,
//     totalAmount: order.totalAmount,
//     coupon: order.coupon,
//     status: order.status,
//     paymentMethod: order.paymentMethod,
//     shippingAddress: order.shippingAddress,
//     createdAt: order.createdAt
//   };
// }

// function createOrderDTO(data) {
//   const {
//     user, items, coupon, subtotal, discount,
//     tax, shippingCost, totalAmount,
//     paymentMethod, shippingAddress
//   } = data;

//   return {
//     user, items, coupon, subtotal, discount,
//     tax, shippingCost, totalAmount,
//     paymentMethod, shippingAddress
//   };
// }

// module.exports = { orderToDTO, createOrderDTO };
