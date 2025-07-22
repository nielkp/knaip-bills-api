import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { createTransactionSchema } from "../schemas/transaction.schema";


const transactionRoutes = async (fastify: FastifyInstance) => {

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: {
        ...zodToJsonSchema(createTransactionSchema),
        type: "object",
      },
    },
    handler: createTransaction,
  });

};

export default transactionRoutes;