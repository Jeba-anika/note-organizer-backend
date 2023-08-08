import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ICategory } from './categories.interface'
import { CategoryService } from './categories.service'

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories()
  sendResponse<ICategory[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  })
})

export const CategoryController = {
  getAllCategories,
}
