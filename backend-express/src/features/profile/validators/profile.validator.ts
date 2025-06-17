import { z } from 'zod'

export const createProfileSchema = z.object({
    dob: z.string().refine((val) => isNaN(Date.parse(val)), {
        message: 'invalid date format'
    }),
    address: z.string().min(1, 'address is required'),
    phone: z.string().min(1, 'phone number is required'),
    gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'gender must be male ,female or other ' })
    }),
})

export const updateProfileSchema = z.object({
    dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format'
    }).optional(),
    address: z.string().min(1, 'address is required').optional(),
    phone: z.string().min(1, 'phone is required').optional(),
    gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'gender must be male, female or other' })
    }).optional()
})