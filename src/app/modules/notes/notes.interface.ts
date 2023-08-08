import { Model, Types } from 'mongoose'
import { ICategory } from '../categories/categories.interface'
import { IUser } from '../users/users.interface'

export type INote = {
  title: string
  note: string
  category: Types.ObjectId | ICategory
  user: Types.ObjectId | IUser
}

export type NoteModel = Model<INote, object>
export type INoteFilters = {
  searchTerm?: string
  title?: string
}
