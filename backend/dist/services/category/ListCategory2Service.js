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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategory2Service = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListCategory2Service {
    execute(officeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const office = yield prisma_1.default.office.findFirst({
                where: {
                    id: officeId,
                },
            });
            const ownerId = office.ownerId;
            const category = yield prisma_1.default.category.findMany({
                where: {
                    ownerId,
                },
            });
            return category;
        });
    }
}
exports.ListCategory2Service = ListCategory2Service;
