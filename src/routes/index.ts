import type { FastifyInstance } from "fastify";
import categoryRoutes from "./category.routes";

async function routes(fastify: FastifyInstance): Promise<void> {

  fastify.get('/status', async () => {
    return {
      status: 'ON!',
      message: 'KnaipBills API RUNNING!'
    };
  });

  fastify.register(categoryRoutes, { prefix: '/categories' })
}
export default routes