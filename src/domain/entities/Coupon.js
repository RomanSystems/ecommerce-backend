class Coupon {
    constructor(
        { code,
            discountType,
            discountValue,
            uses,
            maxUses,
            maxUsesPerUser,
            minOrderAmount,
            startDate,
            endDate,
            isActive,
            applicableProducts
        }) {
        //this.id = _id;
        this.code = code;
        this.discountType = discountType;
        this.discountValue = discountValue;
        this.uses = uses;
        this.maxUses = maxUses;
        this.maxUsesPerUser = maxUsesPerUser;
        this.minOrderAmount = minOrderAmount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
        this.applicableProducts = applicableProducts;
    }
}

module.exports = Coupon;