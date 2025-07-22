import type { FastifyReply, FastifyRequest } from "fastify";
import type { GetTransactionsSummaryQuery } from "../../schemas/transaction.schema";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import prisma from "../../config/prisma";

dayjs.extend(utc)

export const getTransactionsSummary = async (request: FastifyRequest<{ Querystring: GetTransactionsSummaryQuery }>, reply: FastifyReply): Promise<void> => {
  const userId = "@Niel$" // userId => request.userId
  //validação de dados
  if (!userId) {
    reply.status(401).send({ error: "Usuário não Autenticado!" });
    return;
  }

  const { month, year } = request.query;

  if (!month || !year) {
    reply.status(400).send({ error: "Mês e Ano são obrigatórios!" });
    return;
  }

  const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = dayjs.utc(startDate).endOf("month");

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        }
      },
      include: {
        Category: true,
      }
    });

    reply.send(transactions);
  } catch (err) {
    request.log.error("Erro ao trazer transações", err);
    reply.status(500).send({ error: "Erro do servidor" });
  }
}