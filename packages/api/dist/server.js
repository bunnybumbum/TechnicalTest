"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const fastify_multipart_1 = __importDefault(require("fastify-multipart"));
const swagger_1 = require("@fastify/swagger");
const swagger_ui_1 = require("@fastify/swagger-ui");
const samplePlugin_1 = __importDefault(require("./plugins/samplePlugin"));
const sampleRoute_1 = __importDefault(require("./routes/sampleRoute"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const jwtHelper_1 = require("./utils/jwtHelper");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const userController_1 = require("./controllers/userController");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const server = (0, fastify_1.default)({ logger: true });
server.register(fastify_jwt_1.default, {
    secret: 'supersecret', // Replace with a strong secret in production
});
server.register(fastify_multipart_1.default);
// Register Swagger
server.register(swagger_1.fastifySwagger, {
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
server.register(swagger_ui_1.fastifySwaggerUi, {
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
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
    transformSpecificationClone: true,
});
server.register(samplePlugin_1.default);
server.register(sampleRoute_1.default);
server.register(userRoutes_1.default);
server.register(authRoutes_1.default);
server.register(uploadRoutes_1.default);
(0, jwtHelper_1.initJwtHelper)(server);
const httpServer = (0, http_1.createServer)(server.server);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
(0, userController_1.setSocketServer)(io);
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
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
startServer();
