// models/Coupon.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'] },
  discountValue: Number,
  maxUses: Number,
  uses: { type: Number, default: 0 },
  maxUsesPerUser: Number,
  minOrderAmount: Number,
  startDate: Date,
  endDate: Date,
  isActive: { type: Boolean, default: true },
  applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Coupon', couponSchema);
