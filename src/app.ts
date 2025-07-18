import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import routes from './routes';

const app: FastifyInstance = Fastify({
  logger: true,
  trustProxy: true,
});

// Logar IP de todas as requisições
app.addHook('onRequest', async (request, reply) => {
  request.log.info({ ip: request.ip }, `Requisição recebida: ${request.method} ${request.url}`);
});

// Adicionar rotas (com prefixo se quiser, ex: { prefix: '/api' })
app.register(routes);

export default app;
