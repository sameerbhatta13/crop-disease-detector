import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { sendBadRequest } from "../utils/responseUtils";

export const validator = (schema: ZodSchema, source: 'body' | 'params' | 'query' = 'body') => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse((req as Request & { [key in typeof source]: any })[source])

        if (!result.success) {
            const errors = result.error.errors.map((err) => {
                return {
                    path: err.path.length > 0 ? err.path.join('.') : source,
                    message: err.message
                }
            })

            return sendBadRequest(res, `${errors[0].path}:${errors[0].message}`)
        }
        req[source] = result.data
        next()
    }
}