import { Note } from './notes.model'
import { INote, INoteFilters } from './notes.interface'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { noteSearchableFields } from './notes.constant'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { SortOrder } from 'mongoose'

const createNote = async (
  payload: INote,
  userInfo: JwtPayload | null
): Promise<INote> => {
  if (!userInfo) {
    throw new ApiError(400, 'Unauthorized access')
  }
  const result = await Note.create(payload)
  return result
}

const getAllNotes = async (
  filters: INoteFilters,
  paginationOptions: IpaginationOptions,
  userInfo: JwtPayload | null
): Promise<IGenericResponse<INote[]>> => {
  if (!userInfo) {
    throw new ApiError(400, 'Unauthorized access')
  }
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: noteSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereCondition =
    andConditions.length > 0
      ? { user: userInfo._id, $and: andConditions }
      : { user: userInfo._id }

  const result = await Note.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('user')
    .populate('category')
  const total = await Note.countDocuments()
  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  }
}
const getNoteByCategory = async (
  categoryId: string,
  filters: INoteFilters,
  paginationOptions: IpaginationOptions,
  userInfo: JwtPayload | null
): Promise<IGenericResponse<INote[]>> => {
  if (!userInfo) {
    throw new ApiError(400, 'Unauthorized access')
  }
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: noteSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereCondition =
    andConditions.length > 0
      ? { user: userInfo._id, category: categoryId, $and: andConditions }
      : { user: userInfo._id, category: categoryId }

  const result = await Note.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('user')
    .populate('category')
  const total = await Note.countDocuments()
  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  }
}

// const getNoteByCategory = async (
//   categoryId: string,
//   userInfo: JwtPayload | null
// ): Promise<INote | null> => {
//   if (!userInfo) {
//     throw new ApiError(400, 'Unauthorized access')
//   }
//   const result = await Note.find({ user: userInfo._id, category: categoryId })
//     .populate('user')
//     .populate('category')
//   return result
// }

const updateNote = async (
  id: string,
  updatedData: Partial<INote>,
  userInfo: JwtPayload | null
): Promise<INote | null> => {
  if (!userInfo) {
    throw new ApiError(400, 'Unauthorized access')
  }

  const selectedNote = await Note.findById(id)

  if (userInfo._id !== selectedNote?.user.toString()) {
    throw new ApiError(400, 'Unauthorized access')
  }
  const result = await Note.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  })
    .populate('category')
    .populate('user')
  return result
}

const deleteNote = async (id: string, userInfo: JwtPayload | null) => {
  console.log(userInfo)
  if (!userInfo) {
    throw new ApiError(400, 'Unauthorized access')
  }
  const selectedNote = await Note.findById(id)
  if (userInfo._id !== selectedNote?.user.toString()) {
    throw new ApiError(400, 'Unauthorized access')
  }
  const result = await Note.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  )
  return result
}

export const NoteService = {
  createNote,
  updateNote,
  deleteNote,
  getNoteByCategory,
  getAllNotes,
  //getAllCows,
  //   getSingleCow,
  //   updateCow,
  //   deleteCow,
}
