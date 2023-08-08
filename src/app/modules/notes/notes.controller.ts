import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { NoteService } from './notes.service'
import { INote } from './notes.interface'
import pick from '../../../shared/pick'
import { noteFilterableFields } from './notes.constant'
import { paginationFields } from '../../../constants/pagination'

const createNote = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user
  const { ...noteData } = req.body
  const result = await NoteService.createNote(noteData, userInfo)
  sendResponse<INote>(res, {
    success: true,
    message: 'Note created successfully',
    statusCode: 200,
    data: result,
  })
})

const getAllNotes = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user
  const filters = pick(req.query, noteFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await NoteService.getAllNotes(
    filters,
    paginationOptions,
    userInfo
  )
  sendResponse<INote[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Notes retrieved successfully',
    data: result.data,
    meta: result.meta,
  })
})

const getNoteByCategory = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user
  const categoryId = req.params.categoryId
  const filters = pick(req.query, noteFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await NoteService.getNoteByCategory(
    categoryId,
    filters,
    paginationOptions,
    userInfo
  )
  sendResponse<INote>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result.data,
    meta: result.met,
  })
})

const updateNote = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user
  const id = req.params.id
  const updatedNote = req.body
  const result = await NoteService.updateNote(id, updatedNote, userInfo)
  sendResponse<INote>(res, {
    statusCode: 200,
    success: true,
    message: 'Note updated successfully',
    data: result,
  })
})

const deleteNote = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const userInfo = req.user
  console.log(userInfo)
  const result = await NoteService.deleteNote(id, userInfo)
  sendResponse<INote>(res, {
    statusCode: 200,
    success: true,
    message: 'Note deleted successfully',
    data: result,
  })
})

export const NoteController = {
  createNote,
  updateNote,
  deleteNote,
  getNoteByCategory,
  getAllNotes,
}
