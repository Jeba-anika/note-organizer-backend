import express from 'express'
import { NoteController } from './notes.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLES } from '../../enums/user'
const router = express.Router()

router.get(
  '/:categoryId',
  auth(ENUM_USER_ROLES.USER),
  NoteController.getNoteByCategory
)
router.patch('/:id', auth(ENUM_USER_ROLES.USER), NoteController.updateNote)
router.delete('/:id', auth(ENUM_USER_ROLES.USER), NoteController.deleteNote)
router.post('/', auth(ENUM_USER_ROLES.USER), NoteController.createNote)
router.get('/', auth(ENUM_USER_ROLES.USER), NoteController.getAllNotes)

export const NoteRoutes = router
