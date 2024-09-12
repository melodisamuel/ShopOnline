import { HTTP_STATUS } from "~/features/globals/constants/http";
import { categoryService } from "~/services/db/categoryService";
import { Request, Response } from "express";

class CategoryController {
    public async create(req: Request, res: Response) {
        const category = await categoryService.add(req.body);
        return res.status(HTTP_STATUS.OK).json({
            message: 'Create category',
            data: category
        })
    }
}

export const categoryController: CategoryController = new CategoryController();