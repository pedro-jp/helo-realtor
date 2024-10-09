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
exports.CreateUserService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const stripe = new stripe_1.default('sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8');
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            if (!email) {
                throw new Error('Email incorrect');
            }
            const userAlreadyExist = yield prisma_1.default.user.findFirst({
                where: {
                    email: email,
                },
            });
            if (userAlreadyExist) {
                throw new Error('User already exists');
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            const customer = yield stripe.customers.create({
                email: email,
                name: name,
                shipping: {
                    address: {
                        city: 'Brothers',
                        country: 'US',
                        line1: '27 Fredrick Ave',
                        postal_code: '97712',
                        state: 'CA',
                    },
                    name,
                },
                address: {
                    city: 'Brothers',
                    country: 'US',
                    line1: '27 Fredrick Ave',
                    postal_code: '97712',
                    state: 'CA',
                },
            });
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                },
                select: {
                    name: true,
                    id: true,
                    email: true,
                },
            });
            return { user, customer };
        });
    }
}
exports.CreateUserService = CreateUserService;
