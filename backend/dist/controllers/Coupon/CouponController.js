"use strict";
// controllers/couponController.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const CouponService_1 = require("../../services/Coupon/CouponService");
class CouponController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.params;
            try {
                const couponService = yield new CouponService_1.CouponService();
                const result = yield couponService.execute(code);
                console.log('valido');
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                return res.status(400).send({
                    valid: false,
                    message: error.message,
                });
            }
        });
    }
}
exports.CouponController = CouponController;
