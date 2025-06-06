import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {

    //handle invalid json
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
            success: false,
            message: 'invalid json payload',
            errors: [{
                path: "body",
                message: 'Malformed json in the request body'
            }]
        })
    }

    const customeError = {
        statusCode: err.statusCode || 500,
        message: err.message || 'something went wrong, please try again',
        errors: err.errors || []
    }

    //handle mongoose validation error
    if (err.name === 'ValidationError') {
        customeError.statusCode = 400
        customeError.message = 'validation error'
        customeError.errors = Object.values(err.errors).map((item: any) => ({
            path: item.path,
            message: item.message
        }))
    }

    //handle mongoose duplication key error
    if (err.code && err.code === 11000) {
        customeError.statusCode = 400;
        const field = Object.keys(err.keyValue)[0]
        customeError.message = `Duplicate value entered for ${field} field`
        customeError.errors = [
            {
                path: field,
                message: `duplicate value entered for ${err.keyValue[field]}`
            }
        ]
    }

    //handle moongose cast error

    if (err.name === 'CastError') {
        customeError.statusCode = 400
        customeError.message = `Invalid ${err.path}:${err.value}`
        customeError.errors = [{
            path: err.path,
            message: `invalid value :${err.value}`

        }]
    }

    return res.status(customeError.statusCode).json({
        success: false,
        message: customeError.message,
        errors: customeError.errors
    })
}

export default errorHandler