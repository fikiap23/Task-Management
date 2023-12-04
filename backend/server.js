import express from 'express'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'

import subjectRoutes from './routes/subjectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import notesRotes from './routes/notesRoutes.js'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json()) // for parsing application/json data in the request body
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded data in the request body
app.use(cookieParser())

// Routes
app.use('/v1/api/users', userRoutes)
app.use('/v1/api/subjects', subjectRoutes)
app.use('/v1/api/tasks', taskRoutes)
app.use('/v1/api/notes', notesRotes)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootPath = path.resolve(__dirname, '../')

app.use(express.static(path.join(rootPath, 'frontend/dist')))

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(rootPath, 'frontend/dist/service-worker.js'))
})
app.get('*', (req, res) => {
  res.sendFile(path.join(rootPath, 'frontend/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server started at  http://localhost:${PORT}`)
})
