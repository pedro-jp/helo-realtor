"use strict";
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
exports.GetRealtorController = void 0;
const GetRealtorService_1 = require("../../services/Realtor/GetRealtorService");
class GetRealtorController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { realtorId } = req.params;
            const getRealtorService = new GetRealtorService_1.GetRealtorService();
            try {
                const realtor = yield getRealtorService.execute({ realtorId });
                return res.json(realtor);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetRealtorController = GetRealtorController;
