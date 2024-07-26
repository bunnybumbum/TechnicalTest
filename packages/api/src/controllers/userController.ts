import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../prisma';
import bcrypt from 'bcryptjs';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | undefined;

export const setSocketServer = (socketServer: SocketIOServer) => {
  io = socketServer;
};

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const users = await prisma.user.findMany();
  reply.send(users);
};

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  reply.send(user);
};

export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, email, password } = request.body as { name: string; email: string; password: string };
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  if (io) {
    io.emit('userCreated', { message: 'A new user has been created', user });
  }

  reply.send(user);
};

export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { name, email, password } = request.body as { name: string; email: string; password?: string };
  
  const updateData: { name?: string; email?: string; password?: string } = { name, email };
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: updateData,
  });

  if (io) {
    io.emit('userUpdated', { message: 'A user has been updated', user });
  }

  reply.send(user);
};

export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  await prisma.user.delete({
    where: { id: Number(id) },
  });

  if (io) {
    io.emit('userDeleted', { message: 'A user has been deleted', userId: id });
  }

  reply.send({ message: 'User deleted successfully' });
};
