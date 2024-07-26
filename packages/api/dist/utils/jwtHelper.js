"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = exports.initJwtHelper = void 0;
let serverInstance;
const initJwtHelper = (server) => {
    serverInstance = server;
};
exports.initJwtHelper = initJwtHelper;
const signJwt = (payload, options) => {
    if (!serverInstance) {
        throw new Error('JWT helper not initialized with Fastify instance');
    }
    return serverInstance.jwt.sign(payload, options);
};
exports.signJwt = signJwt;
