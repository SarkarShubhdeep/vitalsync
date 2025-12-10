import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';
// import mongoose from 'mongoose'; // Removed unused import
import { connectDB } from './db';
import { vitalsRoutes } from './modules/vitals/routes';

const server = Fastify({
  logger: true
}).withTypeProvider<TypeBoxTypeProvider>();

const start = async () => {
  try {
    // CORS
    await server.register(cors, {
      origin: true // Allow all origins for dev simplicity
    });

    // Swagger registration
    await server.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'VitalsSync API',
          description: 'API for VitalsSync Monorepo',
          version: '0.1.0'
        },
        servers: [{ url: 'http://localhost:3000' }]
      }
    });

    await server.register(fastifySwaggerUi, {
      routePrefix: '/documentation'
    });

    // Database connection
    if (process.env.SKIP_DB !== 'true') {
      await connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/vitalsync');
    } else {
      console.log('Skipping Database connection (SKIP_DB=true)');
    }

    // Register Routes
    await server.register(vitalsRoutes, { prefix: '/api/vitals' });

    // Basic route
    server.get('/health', async (request, reply) => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    await server.ready();
    server.swagger();

    const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${port}`);
    console.log(`Documentation available at http://localhost:${port}/documentation`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
