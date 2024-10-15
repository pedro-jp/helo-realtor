// services/couponService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export class CouponService {
  async execute(couponCode: string) {
    if (!couponCode) {
      throw new Error('Código do cupom é obrigatório');
    }

    try {
      const coupon = await stripe.coupons.retrieve(couponCode);
      return { valid: coupon.valid, coupon };
    } catch (error) {
      console.log(error);
      throw new Error('Cupom inválido ou erro ao validar o cupom');
    }
  }
}
