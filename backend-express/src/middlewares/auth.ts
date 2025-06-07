import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import User, { IUser } from '../features/users/models/user.model';
import { sendBadRequest, sendForbidden } from '../utils/responseUtils';

export interface AuthRequest extends Request {
    userId?: string,
    user?: Partial<IUser>
}

//user authentication with jwt

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return sendBadRequest(res, 'Invalid token')
    }
    const token = authHeader.split(" ")[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET as string) as any
        if (!decode) {
            return sendBadRequest(res, 'Token not valid')
        }

        //cosnt check for existing user
        const user = await User.findById(decode._id)
        if (!user) {
            return sendBadRequest(res, 'user not available')
        }
        // if (!user.isVerified) return sendBadRequest(res, 'user is not varified , please verify first')
        req.user = user
        req.userId = user._id as string
        next()
    } catch (error) {
        return sendBadRequest(res, 'error verfiying token')

    }
}

//Authorize roles
export const authorizeRoles = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user?.role as string)) {
            return sendForbidden(res, 'Not authorized for access this routes')
        }
        next()
    }
}

//authorize admin

export const authorizeAdmin: any = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
        return sendForbidden(res, 'no access to the route')

    }
}
