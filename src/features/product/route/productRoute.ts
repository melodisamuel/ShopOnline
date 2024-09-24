import express from "express";
import { productController } from "../controller/productController";
import { validateSchema } from "~/features/globals/middleware/validateMiddleware";



const productRoute = express.Router();

productRoute.post('/');


export default productRoute;