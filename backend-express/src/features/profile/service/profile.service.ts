import User from "../../users/models/user.model"
import Profile, { IProfile } from "../model/profile.model"

class ProfileService {
    async createProfile(body: any) {
        const userId = body.userId
        if (!userId) return { success: false, message: 'user id is required' }

        const existingProfile = await Profile.findOne({ user: userId })
        if (existingProfile) {
            return { success: false, message: "profile already created" }
        }

        const user = await User.findById(userId)
        if (!user) {
            return { success: false, message: 'user not found' }
        }

        const profile = await Profile.create(body)
        return { success: true, data: profile, message: 'profile created successfully' }

    }

    async getProfile(userId: string) {
        const profile = await Profile.findOne({ user: userId })
        if (!profile) {
            return { success: false, message: 'profile not found' }
        }
        return { success: true, data: profile }
    }

    async updateProfile(userId: string, body: Partial<IProfile>) {
        const profile = await Profile.findOne({ user: userId })
        if (!profile) {
            return { success: false, message: "profile not found" }
        }
        Object.assign(profile, body)  //object.assign(target, ...source)
        await profile.save()
        return { success: true, data: profile }
    }
}

export default new ProfileService()