"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilePicture = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
const pipeline = util_1.default.promisify(require('stream').pipeline);
const uploadProfilePicture = async (request, reply) => {
    const data = await request.file();
    const uploadPath = path_1.default.join(__dirname, '../../uploads', data.filename);
    await pipeline(data.file, fs_1.default.createWriteStream(uploadPath));
    reply.send({ message: 'File uploaded successfully', filename: data.filename });
};
exports.uploadProfilePicture = uploadProfilePicture;
