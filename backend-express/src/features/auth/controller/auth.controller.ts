import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { getUserByEmail } from "../../users/services/user.service";
import { sendBadRequest, sendSuccess } from "../../../utils/responseUtils";
import { sendEmailVerification } from "../../../helpers/email-helper";
import authService from "../service/auth.service";
import { AuthRequest } from "../../../middlewares/auth";

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
    return sendSuccess(res, 'user registered successfully', result.data)
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

//get current user

export const getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user?._id
    const result = await authService.getCurrentUser(userId as string)

    if (!result.success) {
        return sendBadRequest(res, result.message)
    }
    return sendSuccess(res, 'current user retrieved successsfully', result.data)
})

//verify email

export const verifyEmail = asyncHandler(async (req: AuthRequest, res: Response) => {
    const token = req.params.token

    if (!token) return sendBadRequest(res, 'token is not provided')

    const { success, message } = await authService.verifyEmail(token)
    if (!success) {
        return sendBadRequest(res, `${message}`)
    }
    return sendSuccess(res, `${message}`)

})