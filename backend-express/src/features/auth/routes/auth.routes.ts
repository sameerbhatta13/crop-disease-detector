import express from "express";
import { login, register, verifyEmail } from "../controller/auth.controller";
import { validator } from "../../../middlewares/validator";
import { loginValidator, signupValidator } from "../validators/auth.validator";

const router = express.Router()


router.post('/register', validator(signupValidator), register)
router.post('/login', validator(loginValidator), login)
router.get('/verify-email/:token', verifyEmail)


export default router