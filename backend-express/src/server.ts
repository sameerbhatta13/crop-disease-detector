import { configDotenv } from 'dotenv'
import { connectDB } from './configs/database'
import app from './app'
configDotenv()


const port = process.env.PORT || 3000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => console.log(`server is running at ${port}`))
    } catch (error) {

    }
}
startServer()

