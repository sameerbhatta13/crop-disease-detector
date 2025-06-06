import { configDotenv } from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { connectDB } from './configs/database'
configDotenv()

const app = express()
const port = process.env.PORT || 3000


app.use(morgan('dev'))
app.use(express.json())


const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => console.log(`server is running at ${port}`))
    } catch (error) {

    }
}
startServer()

