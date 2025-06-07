import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { getUserByEmail } from "../../users/services/user.service";
import { sendBadRequest, sendSuccess } from "../../../utils/responseUtils";
import { sendEmailVerification } from "../../../helpers/email-helper";
import authService from "../service/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
    let verificationToken: string
    let verificationTokenExpires: number

    const user = await getUserByEmail(req.body.email)
    if (user) return sendBadRequest(res, 'User of this email exists')

    try {
        const result = await sendEmailVerification(req.body.email);
        verificationToken = result.verificationToken,
            verificationTokenExpires = result.verificationTokenExpires

    } catch (error: any) {
        return sendBadRequest(res, 'failed to send email verification email', error.message)

    }
    req.body.verificationToken = verificationToken
    req.body.verificationTokenExpires = verificationTokenExpires

    const result = await authService.register(req.body)

    if (!result.success) {
        return sendBadRequest(res, result.message)
    }
    return sendSuccess(res, 'user registered successfully', result.message)
})


//login
export const login = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body)

    if (!result.success) {
        return sendBadRequest(res, result.message)
    }
    if (!result.data?.user?.isVerified) return sendBadRequest(res, 'user is not verified , please verify your email')


    return sendSuccess(res, 'login successful', result.data)
})