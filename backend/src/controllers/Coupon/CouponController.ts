// controllers/couponController.js

import { CouponService } from '../../services/Coupon/CouponService';

export class CouponController {
  async handle(req, res) {
    const { code } = req.params;

    try {
      const couponService = await new CouponService();

      const result = await couponService.execute(code);
      console.log('valido');
      return res.send(result);
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        valid: false,
        message: error.message,
      });
    }
  }
}
