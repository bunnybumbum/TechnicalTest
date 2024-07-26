"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = exports.setSocketServer = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let io;
const setSocketServer = (socketServer) => {
    io = socketServer;
};
exports.setSocketServer = setSocketServer;
const getUsers = async (request, reply) => {
    const users = await prisma_1.default.user.findMany();
    reply.send(users);
};
exports.getUsers = getUsers;
const getUser = async (request, reply) => {
    const { id } = request.params;
    const user = await prisma_1.default.user.findUnique({
        where: { id: Number(id) },
    });
    reply.send(user);
};
exports.getUser = getUser;
const createUser = async (request, reply) => {
    const { name, email, password } = request.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: { name, email, password: hashedPassword },
    });
    if (io) {
        io.emit('userCreated', { message: 'A new user has been created', user });
    }
    reply.send(user);
};
exports.createUser = createUser;
const updateUser = async (request, reply) => {
    const { id } = request.params;
    const { name, email, password } = request.body;
    const updateData = { name, email };
    if (password) {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        updateData.password = hashedPassword;
    }
    const user = await prisma_1.default.user.update({
        where: { id: Number(id) },
        data: updateData,
    });
    if (io) {
        io.emit('userUpdated', { message: 'A user has been updated', user });
    }
    reply.send(user);
};
exports.updateUser = updateUser;
const deleteUser = async (request, reply) => {
    const { id } = request.params;
    await prisma_1.default.user.delete({
        where: { id: Number(id) },
    });
    if (io) {
        io.emit('userDeleted', { message: 'A user has been deleted', userId: id });
    }
    reply.send({ message: 'User deleted successfully' });
};
exports.deleteUser = deleteUser;
