import { FastifyInstance } from 'fastify';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';

const userRoutes = async (server: FastifyInstance) => {
  server.get('/users', { 
    preValidation: [authenticate, checkRole('admin')], 
    schema: {
      security: [{ bearerAuth: [] }],
    }, 
    handler: getUsers 
  });
  
  server.get('/users/:id', { 
    preValidation: [authenticate],
    schema: {
      security: [{ bearerAuth: [] }],
    }, 
    handler: getUser 
  });
  
  server.post('/users', { 
    preValidation: [authenticate, checkRole('admin')], 
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
    handler: createUser 
  });
  
  server.put('/users/:id', { 
    preValidation: [authenticate, checkRole('admin')], 
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
    handler: updateUser 
  });
  
  server.delete('/users/:id', { 
    preValidation: [authenticate, checkRole('admin')],
    schema: {
      security: [{ bearerAuth: [] }],
    }, 
    handler: deleteUser 
  });
};

export default userRoutes;
