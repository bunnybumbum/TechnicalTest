"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const samplePlugin = (0, fastify_plugin_1.default)(async (server, opts) => {
    server.decorate('utility', () => {
        return 'Utility function';
    });
});
exports.default = samplePlugin;
