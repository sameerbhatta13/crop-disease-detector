import Profile from "../../profile/model/profile.model"
import User from "../../users/models/user.model"

class AuthService {
    async register(body: any) {
        const { email } = body
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return { success: false, message: 'User with this email is already exist' }
        }
        const user = await User.create({
            ...body,
        })

        const accessToken = user.generateAuthToken()

        return {
            success: true,
            data: {
                user,
                accessToken
            }
        }

    }

    async login(body: any) {
        const { email, password } = body
        const user = await User.findOne({ email })
        if (!user) {
            return { success: false, message: 'user not found' }
        }

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            return { success: false, message: 'password or email does not match' }
        }
        const accessToken = user.generateAuthToken()
        await user.save()

        return {
            success: true,
            data: {
                user,
                accessToken
            }
        }
    }

    async getCurrentUser(userId: string) {
        const user = await User.findById(userId)
        if (!user) {
            return { success: false, message: 'User not found' }
        }
        const profile = await Profile.findOne({ user: userId })

        return {
            success: true,
            data: {
                user,
                profile
            }
        }
    }

    async verifyEmail(verificationToken: string) {
        const user = await User.findOne({ verificationToken })

        if (!user) {
            return { success: false, message: "Invalid or expired verification" }
        }
        if (user.isVerified) {
            return { success: false, message: 'user is already verified' }
        }
        if (!user.verificationTokenExpires || user.verificationTokenExpires.getTime() < Date.now()) {
            return { success: false, message: 'verification token expires' }
        }
        //mark as a verified
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpires = undefined
        await user.save()

        return { success: true, message: 'Email verifed successfully' }

    }
}

export default new AuthService()