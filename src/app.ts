import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import type { FastifyInstance } from 'fastify';
import routes from './routes';
import cors from '@fastify/cors';

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
app.register(cors);

// Rotas principais
app.register(routes);

export default app;
