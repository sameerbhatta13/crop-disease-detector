import crypto from 'crypto'
import { EMAIL_FROM } from '../configs/env.config'
import { transporter } from '../configs/email'

interface EmialData {
    subject?: string
    html?: string
}
export const sendEmailVerification = async (to: string): Promise<{ verificationToken: string, verificationTokenExpires: number }> => {

    const verificationToken = crypto.randomBytes(20).toString('hex')
    const verificationTokenExpires = Date.now() + 3600000
    const verificationUrl = `${process.env.BASE_URL}/api/auth/verify-email/${verificationToken}`

    const mailOptions = {
        from: EMAIL_FROM,
        to: to,
        subject: 'Email Verification',
        html: `  <p>Please verify your email by clicking the link below:</p>
            <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p>This link expires in 1 hour</p>
            `
    }

    await transporter.sendMail(mailOptions)
    return { verificationToken, verificationTokenExpires }
}