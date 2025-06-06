import express from "express";
import profileRoutes from '../features/profile/route/profile.routes'

const router = express.Router()


router.use('/profile', profileRoutes)

export default router