class Order {
    constructor({
        user,
        coupon,
        subtotal,
        discount,
        tax,
        shippingCost,
        totalAmount,
        status,
        paymentMethod,
        shippingAddress,
        createdAt,
        items
    }) {
        //this.id = _id;
        this.user = user;
        this.coupon = coupon;
        this.subtotal = subtotal;
        this.discount = discount;
        this.tax = tax;
        this.shippingCost = shippingCost;
        this.totalAmount = totalAmount;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.shippingAddress = shippingAddress;
        this.createdAt = createdAt;
        this.items = items.map(item => ({
            product: item.product,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
        }));
    }
}

module.exports = Order;