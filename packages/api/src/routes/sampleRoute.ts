import { FastifyInstance } from 'fastify';

  const sampleRoute = async (server: FastifyInstance) => {
    server.get('/sample', async (request, reply) => {
      return { message: 'Hello from sample route' };
    });
  };

  export default sampleRoute;