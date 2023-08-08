import express, { Application } from 'express'
import cors from 'cors'
import router from './routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/', router)

app.get('/', (req, res) => {
  res.send('Welcome to Note Organizer App')
})
app.use(globalErrorHandler)

export default app
