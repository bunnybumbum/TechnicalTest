import { FastifyInstance } from 'fastify';
  import fp from 'fastify-plugin';

  const samplePlugin = fp(async (server: FastifyInstance, opts: any) => {
    server.decorate('utility', () => {
      return 'Utility function';
    });
  });

  export default samplePlugin;