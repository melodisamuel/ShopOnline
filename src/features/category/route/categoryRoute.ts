import express from "express";
import { categoryController } from "../controller/categoryController";
import { validateSchema } from "~/features/globals/middleware/validateMiddleware";
import { createCategorySchema } from "../schema/categorySchema";


const categoryRoute = express.Router();

categoryRoute.post('/', validateSchema(createCategorySchema), categoryController.create);

export default categoryRoute;