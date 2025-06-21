class GetAllCoupons {
  constructor(couponRepository) {
    this.couponRepository = couponRepository;
  }

  async execute() {
    console.log('>>> Retrieving all coupons from use case');
    const coupons = await this.couponRepository.getAll();
    console.log('Coupons retrieved from use case:', coupons);
    return coupons;
  }
}

module.exports = GetAllCoupons;