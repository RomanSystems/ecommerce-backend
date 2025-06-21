const CreateCoupon = require('../../application/useCases/CreateCoupon');
const GetAllCoupons = require('../../application/useCases/GetAllCoupons');
const CouponDTO = require('../../application/dtos/CouponDTO');

class CouponController {
  constructor(couponRepository) {
    this.createCoupon = new CreateCoupon(couponRepository);
    this.getAllCoupons = new GetAllCoupons(couponRepository);
  }

  async create(req, res) {
    try {
      console.log('>>> Request body:', req.body);
      const coupon = await this.createCoupon.execute(req.body);
      res.status(201).json(new CouponDTO(coupon));
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      console.log('>>> Fetching all coupons from controller');
      const coupons = await this.getAllCoupons.execute();
      res.status(200).json(coupons);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

}

module.exports = CouponController;