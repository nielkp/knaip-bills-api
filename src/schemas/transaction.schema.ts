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

export const getTransactionsSchema = z.object({
  month: z.string().optional(),
  year: z.string().optional(),
  type: z
    .enum([TransactionType.expense, TransactionType.income], {
      error: () => ({ message: "Tipo inválido." }),
    }),
  categoryId: z
    .string()
    .refine(isValidObjectId, {
      message: "Categoria inválida."
    }),
});

export const getTransactionsSummarySchema = z.object({
  month: z.string({ message: "O mês é obrigatório." }),
  year: z.string({ message: "O ano é obrigatório." }),
});

export const getHistoryTransactionsSchema = z.object({
  month: z.coerce.number().min(1).max(12),
  year: z.coerce.number().min(2010).max(2050),
  months: z.coerce.number().min(1).max(12).optional(),
});

export const deleteTransactionSchema = z.object({
  id: z.string().refine(isValidObjectId, {
    message: "ID inválido."
  }),
})

export type GetHistoryTransactionsQuery = z.infer<typeof getHistoryTransactionsSchema>;
export type GetTransactionsQuery = z.infer<typeof getTransactionsSchema>;
export type GetTransactionsSummaryQuery = z.infer<typeof getTransactionsSummarySchema>;
export type DeleteTransactionParams = z.infer<typeof deleteTransactionSchema>;