import type { FastifyReply, FastifyRequest } from "fastify";
import { createTransactionSchema } from "../../schemas/transaction.schema";
import prisma from "../../config/prisma";

const createTransaction = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const userId = "@Niel$" // userId => request.userId
  //validação de dados
  if (!userId) {
    reply.status(401).send({ error: "Usuário não Autenticado!" });
    return;
  }

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message || "Validação inválida";

    return reply.status(400).send({ error: errorMessage });
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      }
    })

    if (!category) {
      reply.status(400).send({ error: "Categoria inválida" });
      return;
    }

    const parsedData = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parsedData,
      },
      include: {
        Category: true, // com C maiusculo ou c minusculo???
      }
    })

    reply.status(201).send(newTransaction);
  } catch (err) {
    request.log.error("Erro ao criar transação.", err)
    console.error("Erro detalhado:", err);
    reply.status(500).send({ error: "Erro interno do servidor." })
  }
}

export default createTransaction;