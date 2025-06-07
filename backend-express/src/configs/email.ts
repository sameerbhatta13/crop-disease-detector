import nodemailer, { Transporter } from 'nodemailer'
import dotenv from 'dotenv'


dotenv.config()

export const transporter: Transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})