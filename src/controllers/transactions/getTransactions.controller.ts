import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetTransactionsQuery } from "../../schemas/transaction.schema";
import type { TransactionFilter } from "../../types/transaction.types";
import dayjs from "dayjs";
import prisma from "../../config/prisma";
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const getTransactions = async (
  request: FastifyRequest<{ Querystring: GetTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "@Niel$" // userId => request.userId
  //validação de dados
  if (!userId) {
    reply.status(401).send({ error: "Usuário não Autenticado!" });
    return;
  }

  const { month, year, categoryId, type } = request.query;

  const filters: TransactionFilter = { userId };

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(startDate).endOf("month");
    filters.date = { gte: startDate, lte: endDate };
  }

  if (type) {
    filters.type = type;
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: 'desc' },
      include: {
        Category: {
          select: {
            color: true,
            name: true,
            type: true,
          }
        }
      }
    });

    reply.send(transactions);
  } catch (err) {
    request.log.error("Erro ao trazer transações", err);
    reply.status(500).send({ error: "Erro do servidor" });
  }
};