import express from 'express'
import { UserRouter } from '../app/modules/users/users.routes'
import { CategoryRoutes } from '../app/modules/categories/categories.routes'
import { NoteRoutes } from '../app/modules/notes/notes.routes'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/',
    route: UserRouter,
  },
  {
    path: '/categories/',
    route: CategoryRoutes,
  },
  {
    path: '/notes/',
    route: NoteRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
