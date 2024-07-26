"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const checkRole = (role) => {
    return async (request, reply) => {
        try {
            await request.jwtVerify();
            const user = await prisma_1.default.user.findUnique({
                where: { id: request.user.id },
            });
            if (user && user.role === role) {
                return;
            }
            else {
                reply.status(403).send({ error: 'Forbidden' });
            }
        }
        catch (err) {
            reply.status(401).send({ error: 'Unauthorized' });
        }
    };
};
exports.checkRole = checkRole;
