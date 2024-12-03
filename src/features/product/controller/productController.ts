import { Request, Response} from "express";
import { productService } from "~/services/db/product.service";
import { HTTP_STATUS } from "~/features/globals/constants/http";


class ProductController { 
    public async create(req: Request, res: Response) {
        const product = await productService.add(req.body)

        return res.status(HTTP_STATUS.CREATED).json({
            message: 'Created product',
            data: product
        })
    }
    public async read(req: Request, res: Response) {
        const products = await productService.get();

        return res.status(HTTP_STATUS.CREATED).json({
            message: 'Get all products',
            data: products
        })
    }

    
}

export const productController: ProductController = new ProductController();