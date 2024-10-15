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
exports.CreateOfficeController = void 0;
const CreateOfficeService_1 = require("../../services/Office/CreateOfficeService");
class CreateOfficeController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, phone, address, address_city, description, email } = req.body;
            const createOfficeService = new CreateOfficeService_1.CreateOfficeService();
            try {
                const office = yield createOfficeService.execute({
                    name,
                    ownerId: req.user_id,
                    phone,
                    description,
                    address,
                    address_city,
                    email,
                });
                return res.json(office);
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.CreateOfficeController = CreateOfficeController;
