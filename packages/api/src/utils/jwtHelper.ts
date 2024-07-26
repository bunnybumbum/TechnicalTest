import { FastifyInstance } from 'fastify';
import { SignOptions } from 'jsonwebtoken';

let serverInstance: FastifyInstance;

export const initJwtHelper = (server: FastifyInstance) => {
  serverInstance = server;
};

export const signJwt = (payload: object, options?: SignOptions): string => {
  if (!serverInstance) {
    throw new Error('JWT helper not initialized with Fastify instance');
  }
  return serverInstance.jwt.sign(payload, options);
};
