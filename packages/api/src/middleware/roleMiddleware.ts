import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../prisma';

export const checkRole = (role: string) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      const user = await prisma.user.findUnique({
        where: { id: request.user.id },
      });

      if (user && user.role === role) {
        return;
      } else {
        reply.status(403).send({ error: 'Forbidden' });
      }
    } catch (err) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  };
};
