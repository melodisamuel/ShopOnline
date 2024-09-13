import { Category } from "@prisma/client";
import { NotFoundException } from "~/features/globals/middleware/errorMiddleware";
import { prisma } from "~/prisma";

class CategoryService {
    public async add(requestBody: any): Promise<Category> {
        const { name, icon  } = requestBody;


       const category: Category = await prisma.category.create({
        data: {
            name, icon
        }
       })

    return category;
    }

    public async read(): Promise<Category[]> {
        const categories: Category[] = await prisma.category.findMany({
            where: {
                status: true,
            }
        });

        return categories;
    }

    public async readOne(id: number): Promise<Category> {
        const category = await prisma.category.findFirst({
            where: {
                id,
                status: true,
            }
        })

        if (!category) {
            throw new NotFoundException(`Category with ID: ${id} not found`);
        }

        return category;
    }

    public async edit(id: number, requestBody: any) { 
        const { name, icon } = requestBody;

        if (await this.getCountCategory(id) <= 0) {
            throw new NotFoundException(`Category with ID ${id} not found`)
        }

        const updatedCategory = await prisma.category.update({
            where: {
                id, 
                status: true,
            },
            data: {
                name, icon
            }
        })

        if(!updatedCategory) {

         throw new NotFoundException(`Category with ID: ${id} not found`);

        }

        return updatedCategory;
    }

   

    private async getCountCategory(id: number): Promise<number> {
        const count = await prisma.category.count({
            where: {
                id
            }
        })

        return count;
    }
}

export const categoryService: CategoryService = new CategoryService();