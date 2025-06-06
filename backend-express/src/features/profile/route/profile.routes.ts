import express from 'express'
import { authenticateUser } from '../../../middlewares/auth'


const router = express.Router()


router.post('/', authenticateUser)


export default router