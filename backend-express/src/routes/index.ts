import express from "express";
import profileRoutes from '../features/profile/route/profile.routes'
import authRoutes from '../features/auth/routes/auth.routes'

const router = express.Router()


router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)

export default router