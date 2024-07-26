import { FastifyInstance } from 'fastify';
import { uploadProfilePicture } from '../controllers/uploadController';
import { authenticate } from '../middleware/authMiddleware';

const uploadRoutes = async (server: FastifyInstance) => {
  server.post('/upload', { preValidation: [authenticate] }, uploadProfilePicture);
};

export default uploadRoutes;
