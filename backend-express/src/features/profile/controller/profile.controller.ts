import asyncHandler from 'express-async-handler'
import { AuthRequest } from '../../../middlewares/auth'
import { Response } from 'express'
import profileService from '../service/profile.service'
import { sendBadRequest, sendSuccess } from '../../../utils/responseUtils'

export const createProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const profileData = { ...req.body, user: req.userId }

    const result = await profileService.createProfile(profileData)

    if (!result.success) {
        return sendBadRequest(res, result.message)
    }

    return sendSuccess(res, 'profile created successfully', result.data)
})

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req?.user?._id
    if (!userId) return sendBadRequest(res, 'user id not provided')

    const result = await profileService.getProfile(userId as string)
    if (!result.success) {
        return sendBadRequest(res, result.message)
    }

    return sendSuccess(res, 'profile is retrieved successfully', result.data)

})