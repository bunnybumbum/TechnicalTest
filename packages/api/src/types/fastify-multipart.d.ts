import { FastifyPluginCallback } from 'fastify';

declare module 'fastify-multipart' {
  const fastifyMultipart: FastifyPluginCallback;
  export default fastifyMultipart;
}

declare module 'fastify' {
  interface FastifyRequest {
    file: () => Promise<{ file: NodeJS.ReadableStream; filename: string; mimetype: string; encoding: string; }>;
  }
}
