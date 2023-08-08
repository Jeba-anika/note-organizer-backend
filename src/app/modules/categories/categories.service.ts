import { ICategory } from './categories.interface'
import { Category } from './categories.model'

const getAllCategories = async (): Promise<ICategory[] | null> => {
  const result = await Category.find()
  return result
}

export const CategoryService = {
  getAllCategories,
}
