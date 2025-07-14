import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import routes from './routes';

const app: FastifyInstance = Fastify()
app.register(routes)

export default app