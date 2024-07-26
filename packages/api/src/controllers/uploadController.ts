import { FastifyReply, FastifyRequest } from 'fastify';
import fs from 'fs';
import util from 'util';
import path from 'path';

const pipeline = util.promisify(require('stream').pipeline);

export const uploadProfilePicture = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = await request.file();

  const uploadPath = path.join(__dirname, '../../uploads', data.filename);
  await pipeline(data.file, fs.createWriteStream(uploadPath));

  reply.send({ message: 'File uploaded successfully', filename: data.filename });
};
