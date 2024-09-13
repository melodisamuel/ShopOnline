import { HTTP_STATUS } from "~/features/globals/constants/http";
import { categoryService } from "~/services/db/categoryService";
import { Request, Response, NextFunction } from "express";

class CategoryController {
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await categoryService.add(req.body);
            return res.status(HTTP_STATUS.OK).json({
                message: 'Create category',
                data: category,
            });
        } catch (error) {
            next(error); // Forward the error to the error-handling middleware
        }
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryService.read();
            return res.status(HTTP_STATUS.OK).json({
                message: 'Get all categories',
                data: categories,
            });
        } catch (error) {
            next(error); // Forward the error to the error-handling middleware
        }
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await categoryService.readOne(parseInt(req.params.id));
            return res.status(HTTP_STATUS.OK).json({
                message: 'Get category',
                data: category,
            });
        } catch (error) {
            next(error); // Forward the error to the error-handling middleware
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await categoryService.edit(parseInt(req.params.id), req.body);
            return res.status(HTTP_STATUS.OK).json({
                message: 'Update category',
                data: category,
            });
        } catch (error) {
            next(error); // Forward the error to the error-handling middleware
        }
    }
}

export const categoryController: CategoryController = new CategoryController();
