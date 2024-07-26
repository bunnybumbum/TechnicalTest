import { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import bcrypt from 'bcryptjs';
import { registerUser, loginUser } from '../controllers/authController';
import prisma from '../prisma';
import { initJwtHelper } from '../utils/jwtHelper';
import { Server as SocketIOServer } from 'socket.io';
import { setSocketServer } from '../controllers/userController';

let server: FastifyInstance;
let io: SocketIOServer;

beforeAll(async () => {
  server = Fastify();
  server.register(fastifyJwt, {
    secret: 'supersecret',
  });

  await server.ready(); // Ensure the server is ready before initializing the JWT helper

  initJwtHelper(server);

  io = new SocketIOServer();
  jest.spyOn(io, 'emit'); // Mock the emit method
  setSocketServer(io); // Set the Socket.IO server
});

describe('Auth Controller', () => {
  //register test
  it('should register a user', async () => {
    const request = {
      body: {
        name: 'mmmm',
        email: 'mmmm@example.com',
        password: 'password123',
        role: 'admin',
      },
    };

    const reply = {
      send: jest.fn(),
    };

    await registerUser(request as any, reply as any);
    expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({
      name: 'mmmm',
      email: 'mmmm@example.com',
    }));
    expect(io.emit).toHaveBeenCalledWith('userCreated', expect.anything());
  });

  //login test
  it('should log in a user', async () => {
    const request = {
      body: {
        email: 'username@example.com',
        password: 'password123',
      },
      jwtVerify: jest.fn().mockResolvedValue({ id: 66, role: 'admin' }),
    };

    const reply = {
      send: jest.fn(),
    };

    // Simulate a user with the correct email and password
    await prisma.user.update({
      where: { email: 'username@example.com' },
      data: { password: await bcrypt.hash('password123', 10) },
    });

    await loginUser(request as any, reply as any);
    expect(reply.send).toHaveBeenCalledWith(expect.objectContaining({
      token: expect.any(String),
    }));
  });
});
