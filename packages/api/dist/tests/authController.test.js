"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authController_1 = require("../controllers/authController");
const prisma_1 = __importDefault(require("../prisma"));
const jwtHelper_1 = require("../utils/jwtHelper");
const socket_io_1 = require("socket.io");
const userController_1 = require("../controllers/userController");
let server;
let io;
beforeAll(async () => {
    server = (0, fastify_1.default)();
    server.register(fastify_jwt_1.default, {
        secret: 'supersecret',
    });
    await server.ready(); // Ensure the server is ready before initializing the JWT helper
    (0, jwtHelper_1.initJwtHelper)(server);
    io = new socket_io_1.Server();
    jest.spyOn(io, 'emit'); // Mock the emit method
    (0, userController_1.setSocketServer)(io); // Set the Socket.IO server
});
describe('Auth Controller', () => {
    //register test
    it('should register a user', async () => {
        const request = {
            body: {
                name: 'mmmm',
                email: 'mmmm@example.com',
                password: 'password123',
                role: 'admin',
            },
        };
        const reply = {
            send: jest.fn(),
        };
        await (0, authController_1.registerUser)(request, reply);
        expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({
            name: 'mmmm',
            email: 'mmmm@example.com',
        }));
        expect(io.emit).toHaveBeenCalledWith('userCreated', expect.anything());
    });
    //login test
    it('should log in a user', async () => {
        const request = {
            body: {
                email: 'username@example.com',
                password: 'password123',
            },
            jwtVerify: jest.fn().mockResolvedValue({ id: 66, role: 'admin' }),
        };
        const reply = {
            send: jest.fn(),
        };
        // Simulate a user with the correct email and password
        await prisma_1.default.user.update({
            where: { email: 'username@example.com' },
            data: { password: await bcryptjs_1.default.hash('password123', 10) },
        });
        await (0, authController_1.loginUser)(request, reply);
        expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({
            token: expect.any(String),
        }));
    });
});
