import type { FastifyInstance } from "fastify"
import { getCategories } from "../controllers/category.controller"

const categoryRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/', getCategories);
}

export default categoryRoutes