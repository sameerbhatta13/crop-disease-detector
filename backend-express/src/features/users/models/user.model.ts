import mongoose, { type Document, Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


//String is refers to the class and string refers to the keywords
export interface IUser extends Document {
    name: string,
    email: string,
    password: string
    role: 'user' | 'admin'
    isActive: boolean
    isVerified?: boolean
    profile?: mongoose.Types.ObjectId
    verificationToken?: string
    verificationTokenExpires?: Date
    generateAuthToken(): string
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, trim: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" }

})

//hashed password
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//compare password (method is not a valid syntax, so method is valid syntax)
UserSchema.methods.comparePassword = async function (newPassword: string): Promise<boolean> {
    return await bcrypt.compare(newPassword, this.password)
}


//generate the token
UserSchema.methods.generateAuthToken = function (): string {
    return jwt.sign({ id: this._id, name: this.name, role: this.role }, process.env.JWT_SECRETS as any, { expiresIn: process.env.JWT_EXPIRES_IN as any })
}


const User = mongoose.model<IUser>('User', UserSchema)
export default User


