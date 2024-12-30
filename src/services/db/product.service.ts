import { Product } from '@prisma/client'
import { utilsConstant } from '~/features/globals/constants/utils'
import { NotFoundException } from '~/features/globals/middleware/errorMiddleware'
import { IProductBody } from '~/features/product/interface/productInterface'
import { prisma } from '~/prisma'

class ProductService {
  public async add(requestBody: IProductBody): Promise<Product> {
    const { name, longDescription, shortDescription, quantity, main_image, categoryId } = requestBody

    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!categoryExists) {
      throw new Error('This categoryId do')
    }

    const product: Product = await prisma.product.create({
      data: requestBody
    })

    return product
  }

  public async get(): Promise<Product[]> {
    const products: Product[] = await prisma.product.findMany()
    return products
  }

  public async getPagination(
    page: number = utilsConstant.DEFAULT_PAGE,
    pagesize: number = utilsConstant.DEFAULT_PAGE_SIZE,
    sortBy: string = utilsConstant.DEFAULT_SORT_BY,
    sortDir: string = utilsConstant.DEFAULT_SORT_DIR,
    where = {}
  ) {
    // Every page should have 5 products
    const skip: number = (page - 1) * pagesize
    const take: number = pagesize

    const products: Product[] = await prisma.product.findMany({
      // where: {
      //   quantity: {
      //     lte: 9,
      //   }
      // },
      where,
      skip,
      take,
      orderBy: {
        [sortBy]: sortDir
      }
    })

    return products
  }

  public async getOne(id: number): Promise<Product> {
    const product: Product | null = await prisma.product.findFirst({
      where: {
        id
      }
    })

    if (!product) {
      throw new NotFoundException(`Product with ID: ${id} not found`)
    }

    return product
  }

  public async edit(id: number, requestBody: IProductBody): Promise<Product> {
    const { name, longDescription, shortDescription, quantity, main_image, categoryId } = requestBody

    if ((await this.getProductCount(id)) === 0) {
      throw new NotFoundException(`Product with ID: ${id} not found`)
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        longDescription,
        shortDescription,
        quantity,
        main_image,
        categoryId
      }
    })

    return product
  }

  private async getProductCount(id: number): Promise<number> {
    const count: number = await prisma.product.count({
      where: { id }
    })

    return count
  }

  public async remove(id: number) {
    if ((await this.getProductCount(id)) === 0) {
      throw new NotFoundException(`Product with ID: ${id} not found`)
    }

    await prisma.product.delete({
      where: { id }
    })
  }
}

export const productService: ProductService = new ProductService()
