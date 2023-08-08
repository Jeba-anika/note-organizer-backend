import { Schema, model } from 'mongoose'
import { CategoryModel, ICategory } from './categories.interface'

const categorySchema = new Schema<ICategory>(
  {
    categoryId: { type: Number, required: true },
    categoryName: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Category = model<ICategory, CategoryModel>(
  'Category',
  categorySchema
)
