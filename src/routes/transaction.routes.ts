import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { createTransactionSchema, deleteTransactionSchema, getTransactionsSchema, getTransactionsSummarySchema } from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";


const transactionRoutes = async (fastify: FastifyInstance) => {

  fastify.addHook('preHandler', authMiddleware)

  //CRIAR TRANSAÇÃO
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

  //BUSCAR TRANSAÇÃO COM FILTROS!
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: {
        ...zodToJsonSchema(getTransactionsSchema),
        type: "object"
      }
    },
    handler: getTransactions,
  });

  //BUSCAR RESUMO DE TRANSAÇÕES
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: {
        ...zodToJsonSchema(getTransactionsSummarySchema),
        type: "object"
      },
    },
    handler: getTransactionsSummary,
  });

  //DELETAR TRANSAÇÃO
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: {
        ...zodToJsonSchema(deleteTransactionSchema),
        type: "object"
      },
    },
    handler: deleteTransaction,
  });

  //FIM
};

export default transactionRoutes;