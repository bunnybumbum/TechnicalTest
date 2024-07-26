import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import fastifyMultipart from 'fastify-multipart';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import samplePlugin from './plugins/samplePlugin';
import sampleRoute from './routes/sampleRoute';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { initJwtHelper } from './utils/jwtHelper';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import { setSocketServer } from './controllers/userController';

const server = Fastify({ logger: true });

server.register(fastifyJwt, {
  secret: 'supersecret', // Replace with a strong secret in production
});

server.register(fastifyMultipart);

// Register Swagger
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API Documentation',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
});

server.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next(); },
    preHandler: function (request, reply, next) { next(); },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true,
});

server.register(samplePlugin);
server.register(sampleRoute);
server.register(userRoutes);
server.register(authRoutes);
server.register(uploadRoutes);

initJwtHelper(server);

const httpServer = createServer(server.server);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

setSocketServer(io);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const startServer = async () => {
  try {
    const port = process.env.PORT || 3000;
    await server.listen(port, '0.0.0.0'); // Listen on all network interfaces
    // await server.listen(3000);
    httpServer.listen(Number(port) + 1, () => {
      console.log(`Socket.IO server running at http://localhost:${Number(port) + 1}/`);
    });
    console.log(`Fastify server running at http://localhost:${port}/`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
