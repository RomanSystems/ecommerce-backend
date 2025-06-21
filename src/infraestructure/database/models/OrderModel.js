// models/Order.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    unitPrice: Number,
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [orderItemSchema],
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', default: null },
    subtotal: Number,
    discount: { type: Number, default: 0 },
    tax: Number,
    shippingCost: Number,
    totalAmount: Number,
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: { type: String, enum: ['card', 'paypal', 'cash'], default: 'card' },
    shippingAddress: {
        street: String,
        city: String,
        country: String,
        zip: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
