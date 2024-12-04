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
exports.CreateIndicationController = void 0;
const CreateIndicationService_1 = require("../../services/Indication/CreateIndicationService");
class CreateIndicationController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createIndicationService = new CreateIndicationService_1.CreateIndicationService();
            const { email, indicatedToId } = req.params;
            console.log('-----teste------');
            const indication = yield createIndicationService.execute(email, indicatedToId);
            return res.json(indication);
        });
    }
}
exports.CreateIndicationController = CreateIndicationController;
