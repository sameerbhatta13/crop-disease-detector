import mongoose, { Schema, type Document } from "mongoose"

export interface IProfile extends Document {
    user: mongoose.Types.ObjectId | string
    dob: Date,
    address: string
    phone: string
    gender: 'male' | 'female' | 'other'
    avatarUrl?: string
    createdAt?: Date
    updatedAt?: Date
}

const profileSchema = new Schema<IProfile>(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        dob: { type: Date, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        gender: { type: String, enum: ['male', 'female', 'other'], required: true },
        avatarUrl: { type: String },
    }, {
    timestamps: true
}
)

const profile = mongoose.model<IProfile>('Profile', profileSchema)
export default profile

