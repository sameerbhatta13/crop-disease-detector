import express from 'express'
import { authenticateUser } from '../../../middlewares/auth'
import { upload } from '../../../configs/multer.config'
import { createProfileSchema, updateProfileSchema } from '../validators/profile.validator'
import { validator } from '../../../middlewares/validator'
import { createProfile, getProfile, updateProfile } from '../controller/profile.controller'


const router = express.Router()

router.post('/', authenticateUser, upload.fields([{ name: 'avatar', maxCount: 1 }]), validator(createProfileSchema, "body"), createProfile)
router.get('/', authenticateUser, getProfile)
router.patch('/', authenticateUser, upload.fields([{ name: 'avatar', maxCount: 1 }]), validator(updateProfileSchema), updateProfile)



export default router