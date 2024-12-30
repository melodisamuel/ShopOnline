import { Request, Response, NextFunction } from 'express'
import { productService } from '~/services/db/product.service'
import { HTTP_STATUS } from '~/features/globals/constants/http'
import { utilsConstant } from '~/features/globals/constants/utils'

class ProductController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.add(req.body)
      return res.status(HTTP_STATUS.CREATED).json({
        message: 'Created product',
        data: product
      })
    } catch (error) {
      next(error)
    }
  }

  public async read(req: Request, res: Response, next: NextFunction) {
    try {
      // const products = await productService.get();
      const page = parseInt(req.query.page as string) || utilsConstant.DEFAULT_PAGE
      const pagesize = parseInt(req.query.pagesize as string) || utilsConstant.DEFAULT_PAGE_SIZE
      const sortBy = req.query.sortBy as string || utilsConstant.DEFAULT_SORT_BY;
      const sortDir = req.query.sortDir as string || utilsConstant.DEFAULT_SORT_DIR;
      console.log({ page, pagesize })

        // where: {
      //   quantity: {
      //     lte: 9,
      //   }
      // },
      
      const where: any =  {};
      const filterBy: string = req.query.filterBy as string;
      const filterValueParams: string = req.query.filterValue as string;
      const [filterCondition, filterValue] = filterValueParams.split('.');

      const operations = ['lt', 'lte', 'gt', 'gte', 'eq']

      // console.log({filterBy, filterCondition, filterValue});

      if(filterCondition === 'eq') {
        where[filterBy] = parseInt(filterValue)
      }

      operations.forEach(operation => {
        if (filterCondition === operation) {
          console.log(filterBy, filterCondition, filterValue);
          where[filterBy] = {};
          where[filterBy][filterCondition] = parseInt(filterValue);
        }
      })

      console.log(where);

      const products = await productService.getPagination(page, pagesize, sortBy, sortDir, where);





    

      return res.status(HTTP_STATUS.OK).json({
        message: 'Get all products',
        totalCount: products.length,
        data: products
      })


    } catch (error) {
      next(error)
    }
  }

  public async readOne(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.getOne(parseInt(req.params.id))
      return res.status(HTTP_STATUS.OK).json({
        message: 'Get single product',
        data: product
      })
    } catch (error) {
      next(error)
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.edit(parseInt(req.params.id), req.body)

      return res.status(HTTP_STATUS.OK).json({
        message: 'Update product',
        data: product
      })
    } catch (error) {
      next(error)
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.remove(parseInt(req.params.id))

      return res.status(HTTP_STATUS.OK).json({
        message: 'Delete product',
        data: product
      })
    } catch (error) {
      next(error)
    }
  }
}

export const productController: ProductController = new ProductController()
