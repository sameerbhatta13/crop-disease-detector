import User from "../../users/user.model"

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
}