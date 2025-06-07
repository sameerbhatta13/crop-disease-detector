import User from "../models/user.model";

export const getUserByEmail = async (email: string) => await User.findOne({ email })

export const getUserById = async (id: string) => await User.findById(id)