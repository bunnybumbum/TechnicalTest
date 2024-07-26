"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampleRoute = async (server) => {
    server.get('/sample', async (request, reply) => {
        return { message: 'Hello from sample route' };
    });
};
exports.default = sampleRoute;
