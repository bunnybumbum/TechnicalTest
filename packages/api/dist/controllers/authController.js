"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtHelper_1 = require("../utils/jwtHelper");
const userController_1 = require("./userController");
const registerUser = async (request, reply) => {
    await (0, userController_1.createUser)(request, reply);
};
exports.registerUser = registerUser;
const loginUser = async (request, reply) => {
    const { email, password } = request.body;
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        reply.status(401).send({ error: 'Invalid email or password' });
        return;
    }
    const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
        reply.status(401).send({ error: 'Invalid email or password' });
        return;
    }
    const token = (0, jwtHelper_1.signJwt)({ id: user.id });
    reply.send({ token });
};
exports.loginUser = loginUser;
