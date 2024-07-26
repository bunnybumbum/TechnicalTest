"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadController_1 = require("../controllers/uploadController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadRoutes = async (server) => {
    server.post('/upload', { preValidation: [authMiddleware_1.authenticate] }, uploadController_1.uploadProfilePicture);
};
exports.default = uploadRoutes;
