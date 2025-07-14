import { FastifyInstance } from "fastify";

async function routes(fastify: FastifyInstance): Promise<void> {

  fastify.get('/status', async () => {
    return {
      status: 'ON!',
      message: 'KnaipBills API RUNNING!'
    }
  })
}
export default routes