import multer from "multer";
import path from "path";
import fs from 'fs/promises'
import { Request } from "express";
import { existsSync } from "fs";

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')  //resolve from src → parent (your project root) → then into public.
//if i am deep nested in the folder i have to use (_dirname, '..', '..','public')
const storage = multer.diskStorage({
    destination: async (_req, file, cb) => {
        const subfolder = file.fieldname === 'avatar' ? 'avatar' : 'others'
        const folder = path.join(PUBLIC_DIR, 'image', subfolder)

        try {
            console.log(`creating directory : ${folder}`)
            await fs.mkdir(folder, { recursive: true })
            cb(null, folder)

        } catch (error) {
            console.log(`error creating directory ${folder}`, error)
            cb(error as Error, folder)
        }
    },

    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase()  //it extract the .jpg
        const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-').slice(0, 50)
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, `${basename}-${unique}${ext}`)
    }
})

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase()

    if (allowedTypes.includes(file.mimetype) && allowedTypes.includes(ext)) {
        cb(null, true)
    }
    else {
        cb(new Error('Only JPEG, PNG, and GIF images are allowed') as any, false)
    }
}


export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
        files: 1,
    }
})

export const deleteAvatar = async (filePath: string): Promise<void> => {
    try {
        if (!filePath) {
            console.warn('no file path is provided')
            return
        }
        const fsPath = filePath.startsWith('/public') ? filePath.replace(/^public\//, `${PUBLIC_DIR}`) : filePath
        if (existsSync(fsPath)) {
            console.log(`deleting file :${fsPath}`)
            await fs.unlink(fsPath)
        } else {
            console.warn(`file not found for deletion ${fsPath}`)
        }
    } catch (error) {
        console.error(`error deleting file ${filePath}:`, error)
        throw new Error(`failed to delete file: ${(error as Error).message}`)
    }
}

export const updateAvatar = async (oldFilePath: string | undefined, newFile: Express.Multer.File): Promise<string> => {
    try {
        if (oldFilePath) {
            await deleteAvatar(oldFilePath)
        }
        const publicPath = newFile.path.replace('/\\/g', '/').replace(new RegExp(`^${PUBLIC_DIR}/`), 'public/')

        if (!existsSync(newFile.path)) {
            throw new Error(`updated file path not found  at ${newFile.path}`)
        }
        console.log(`generated public path:${publicPath}`)
        return publicPath
    } catch (error) {
        console.error('Error updating avatar:', error);
        throw error;

    }
}