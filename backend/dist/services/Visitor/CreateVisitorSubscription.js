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
exports.CreateVisitorSubscription = void 0;
const client_1 = require("@prisma/client");
class CreateVisitorSubscription {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ officeId, email, name }) {
            const existingVisitor = yield this.prisma.visitor_Subscription.findMany({
                where: {
                    AND: [{ email }, { officeId }],
                },
            });
            // Verificar se já existe um visitante
            if (existingVisitor.length === 0) {
                try {
                    const visitor = yield this.prisma.visitor_Subscription.create({
                        data: {
                            officeId,
                            email,
                            name,
                        },
                    });
                    console.log(visitor);
                    return visitor;
                }
                catch (error) {
                    console.error('Error creating visitor:', error);
                }
            }
            else {
                console.log('Visitor already exists');
            }
        });
    }
}
exports.CreateVisitorSubscription = CreateVisitorSubscription;
