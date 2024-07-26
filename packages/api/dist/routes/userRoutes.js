"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const userRoutes = async (server) => {
    server.get('/users', {
        preValidation: [authMiddleware_1.authenticate, (0, roleMiddleware_1.checkRole)('admin')],
        schema: {
            security: [{ bearerAuth: [] }],
        },
        handler: userController_1.getUsers
    });
    server.get('/users/:id', {
        preValidation: [authMiddleware_1.authenticate],
        schema: {
            security: [{ bearerAuth: [] }],
        },
        handler: userController_1.getUser
    });
    server.post('/users', {
        preValidation: [authMiddleware_1.authenticate, (0, roleMiddleware_1.checkRole)('admin')],
        schema: {
            body: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                },
            },
            security: [{ bearerAuth: [] }],
        },
        handler: userController_1.createUser
    });
    server.put('/users/:id', {
        preValidation: [authMiddleware_1.authenticate, (0, roleMiddleware_1.checkRole)('admin')],
        schema: {
            body: {
                type: 'object',
                required: ['name', 'email'],
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                },
            },
            security: [{ bearerAuth: [] }],
        },
        handler: userController_1.updateUser
    });
    server.delete('/users/:id', {
        preValidation: [authMiddleware_1.authenticate, (0, roleMiddleware_1.checkRole)('admin')],
        schema: {
            security: [{ bearerAuth: [] }],
        },
        handler: userController_1.deleteUser
    });
};
exports.default = userRoutes;
