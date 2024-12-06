import express from "express";
import { productController } from "../controller/productController";
import { validateSchema } from "~/features/globals/middleware/validateMiddleware";
import { ProductSchema } from "../schema/productSchema";



const productRoute = express.Router();

productRoute.post('/', validateSchema(ProductSchema), productController.create);
productRoute.get('/', productController.read);
productRoute.get('/:id', productController.readOne);
productRoute.put('/:id', validateSchema(ProductSchema), productController.update);
productRoute.delete('/:id', productController.delete);


export default productRoute;