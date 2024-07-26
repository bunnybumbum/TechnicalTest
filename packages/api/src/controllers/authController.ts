import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../prisma';
import bcrypt from 'bcryptjs';
import { signJwt } from '../utils/jwtHelper';
import { createUser } from './userController';
export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  await createUser(request, reply);
};

export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as { email: string; password: string };
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    reply.status(401).send({ error: 'Invalid email or password' });
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    reply.status(401).send({ error: 'Invalid email or password' });
    return;
  }

  const token = signJwt({ id: user.id });
  reply.send({ token });
};
