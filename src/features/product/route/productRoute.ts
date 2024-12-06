import express from "express";
import { productController } from "../controller/productController";
import { validateSchema } from "~/features/globals/middleware/validateMiddleware";



const productRoute = express.Router();

productRoute.post('/', productController.create);
productRoute.get('/', productController.read);
productRoute.get('/:id', productController.readOne);
productRoute.put('/:id', productController.update);


export default productRoute;