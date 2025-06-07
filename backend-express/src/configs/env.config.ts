import dotenv from 'dotenv'
import path from 'path'


const envFile = path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`)
dotenv.config({ path: envFile })


export const EMAIL_FROM = process.env.EMAIL_FROM as string