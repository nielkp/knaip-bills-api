import { TransactionType } from "@prisma/client";
import { ObjectId } from "mongodb";
import { z } from "zod";


const isValidObjectId = (id: string): boolean => ObjectId.isValid(id);

export const createTransactionSchema = z.object({
  description: z.string().min(1, "Descrição obrigatória."),
  amount: z.number().positive("Valor deve ser positivo."),
  date: z.coerce.date({
    error: () => ({ message: "Data inválida." }),
  }),
  categoryId: z.string().refine(isValidObjectId, {
    message: "Categoria inválida."
  }),
  type: z.enum([TransactionType.expense, TransactionType.income], {
    error: () => ({ message: "Tipo inválido." }),
  })
});