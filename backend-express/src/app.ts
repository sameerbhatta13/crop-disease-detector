import express, { Request, Response } from 'express'
import routes from './routes/index'
import errorHandler from './middlewares/error-handler'
import morgan from 'morgan'
const app = express()


//middleware
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', routes)

//error handling middleware
app.use(errorHandler as any)

export default app