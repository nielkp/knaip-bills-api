import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { createTransactionSchema, getTransactionsSchema, getTransactionsSummarySchema } from "../schemas/transaction.schema";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";


const transactionRoutes = async (fastify: FastifyInstance) => {
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

  //FIM
};

export default transactionRoutes;