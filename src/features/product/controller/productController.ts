import { Request, Response, NextFunction } from "express";
import { productService } from "~/services/db/product.service";
import { HTTP_STATUS } from "~/features/globals/constants/http";

class ProductController { 
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.add(req.body);
            return res.status(HTTP_STATUS.CREATED).json({
                message: 'Created product',
                data: product,
            });
        } catch (error) {
            next(error); 
        }
    }

    public async read(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await productService.get();
            return res.status(HTTP_STATUS.OK).json({
                message: 'Get all products',
                totalCount: products.length,
                data: products,
            });
        } catch (error) {
            next(error); 
        }
    }

    public async readOne(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.getOne(parseInt(req.params.id));
            return res.status(HTTP_STATUS.OK).json({
                message: 'Get single product',
                data: product,
            });
        } catch (error) {
            next(error); 
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.edit(parseInt(req.params.id), req.body);

            return res.status(HTTP_STATUS.OK).json({
                message: 'Update product',
                data: product,
            });
        } catch (error) {
            next(error); 
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.remove(parseInt(req.params.id));

            return res.status(HTTP_STATUS.OK).json({
                message: 'Delete product',
                data: product,
            });
        } catch (error) {
            next(error);
        }
    }
}

export const productController: ProductController = new ProductController();
