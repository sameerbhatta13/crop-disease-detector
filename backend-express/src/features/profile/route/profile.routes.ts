import express from 'express'
import { authenticateUser } from '../../../middlewares/auth'
import { upload } from '../../../configs/multer.config'
import { createProfileSchema } from '../validators/profile.validator'
import { validator } from '../../../middlewares/validator'
import { createProfile } from '../controller/profile.controller'


const router = express.Router()

router.post('/', authenticateUser, upload.fields([{ name: 'avatar', maxCount: 1 }]), validator(createProfileSchema, "body"), createProfile)


export default router