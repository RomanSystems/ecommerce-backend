class CouponDTO {
  constructor(coupon) {
    this.id = coupon._id;
    this.code = coupon.code;
    this.discountType = coupon.discountType;
    this.discountValue = coupon.discountValue;
    this.uses = coupon.uses;
    this.maxUses = coupon.maxUses;
    this.maxUsesPerUser = coupon.maxUsesPerUser;
    this.minOrderAmount = coupon.minOrderAmount;
    this.startDate = coupon.startDate;
    this.endDate = coupon.endDate;
    this.isActive = coupon.isActive;
    this.applicableProducts = coupon.applicableProducts;
  }
}

module.exports = CouponDTO;


// function couponToDTO(coupon) {
//   return {
//     id: coupon._id,
//     code: coupon.code,
//     discountType: coupon.discountType,
//     discountValue: coupon.discountValue,
//     uses: coupon.uses,
//     maxUses: coupon.maxUses,
//     isActive: coupon.isActive,
//     startDate: coupon.startDate,
//     endDate: coupon.endDate,
//     applicableProducts: coupon.applicableProducts
//   };
// }

// function createCouponDTO(data) {
//   const {
//     code, discountType, discountValue, maxUses, maxUsesPerUser,
//     minOrderAmount, startDate, endDate, applicableProducts
//   } = data;

//   return {
//     code, discountType, discountValue, maxUses, maxUsesPerUser,
//     minOrderAmount, startDate, endDate, applicableProducts
//   };
// }

// module.exports = { couponToDTO, createCouponDTO };
