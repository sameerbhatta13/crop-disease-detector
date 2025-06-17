import asyncHandler from 'express-async-handler'
import { AuthRequest } from '../../../middlewares/auth'
import { Response } from 'express'
import profileService from '../service/profile.service'
import { sendBadRequest, sendSuccess } from '../../../utils/responseUtils'
import { updateAvatar } from '../../../configs/multer.config'

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

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId
    const files = req.files as any

    if (!userId) return sendBadRequest(res, 'userId is not provided')
    const profile = await profileService.getProfile(req.userId as string)
    if (files?.avatar?.[0]) {
        const avatarPath = await updateAvatar(profile?.data?.avatarUrl, files?.avatar?.[0])
        req.body.avatarUrl = avatarPath
    }

    const result = await profileService.updateProfile(userId, req.body)
    if (!result.success) {
        return sendBadRequest(res, result.message)
    }
    return sendSuccess(res, "profile is updated successfully", result.data)

})