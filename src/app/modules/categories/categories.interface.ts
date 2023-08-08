import { Model } from 'mongoose'

export type ICategory = {
  categoryId: number
  categoryName: string
}

export type CategoryModel = Model<ICategory, object>
