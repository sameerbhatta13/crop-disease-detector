import express, { Request, Response } from 'express'
import routes from './routes/index'
const app = express()

app.use('/api', routes)

export default app