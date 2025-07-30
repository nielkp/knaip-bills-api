import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import type { FastifyInstance } from 'fastify';
import routes from './routes';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config();

const app: FastifyInstance = Fastify({
  logger: true,
  trustProxy: true,
});

// Servir arquivos estáticos como favicon.ico
app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/', // Disponível como /favicon.ico
});

// Logar IP de todas as requisições
app.addHook('onRequest', async (request, reply) => {
  request.log.info({ ip: request.ip }, `Request recebido: ${request.method} ${request.url}`);
});

// Rota do FastifyCors
const allowedOrigins = process.env.CORS_ORIGINS?.split(',').map(o => o.trim());

app.register(cors, {
  origin: (origin, callback) => {
    console.log('Origem da requisição:', origin);

    if (!origin || allowedOrigins?.includes(origin)) {
      callback(null, true);
    } else {
      console.error('❌ Origem bloqueada por CORS:', origin);
      callback(new Error('Não perminito pelo CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
});

// Rotas principais
app.register(routes);

export default app;
