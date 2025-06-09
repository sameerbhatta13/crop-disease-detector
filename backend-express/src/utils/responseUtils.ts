import { Response } from "express";

interface ApiResponse {
    success: boolean
    message: string
    data?: any
}

export const sendCreated = (res: Response, message: string, data?: any) => {
    const response: ApiResponse = { success: true, message, data }
    res.status(201).json(response)
}

export const sendSuccess = (res: Response, message: string, data?: any) => {
    const response: ApiResponse = { success: true, message, data }
    res.status(200).json(response)
}

export const sendBadRequest = (res: Response, message = 'InvalidRequest', data?: any) => {
    const response: ApiResponse = { success: false, message, data }
    res.status(400).json(response)

}

export const sendUnauthorized = (res: Response, message = 'Unauthorized') => {
    const response: ApiResponse = { success: false, message };
    res.status(401).json(response);
}

export const sendForbidden = (res: Response, message = 'Forbidden') => {
    const response: ApiResponse = { success: false, message };
    res.status(403).json(response);
}

export const sendNotFound = (res: Response, message = 'Not Found') => {
    const response: ApiResponse = { success: false, message };
    res.status(404).json(response);
}

export const sendError = (res: Response, message: string, data?: any) => {
    const response: ApiResponse = { success: false, message, data };
    res.status(500).json(response);
}