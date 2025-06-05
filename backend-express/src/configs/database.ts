import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL as string)
        console.log(`database is connected in ${process.env.NODE_ENV as string} mode`)

    } catch (error) {
        console.log('mongodb is not connected', error)
        process.exit(1)
    }
}
