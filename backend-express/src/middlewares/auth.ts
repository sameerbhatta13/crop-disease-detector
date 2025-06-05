import { Request } from 'express';
import jwt from 'jsonwebtoken'
import { IUser } from '../features/users/user.model';

export interface AuthRequest extends Request {
    userId?: string,
    user?: Partial<IUser>


}