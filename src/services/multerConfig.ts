import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadPath = path.resolve(__dirname, '..', 'uploads')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.params.id
        const userUploadPath = path.join(uploadPath, userId)

        // Verifica se a pasta existe, caso contrário, cria a pasta
        if (!fs.existsSync(userUploadPath)) {
            fs.mkdirSync(userUploadPath, { recursive: true })
        }

        cb(null, userUploadPath)
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})

export const upload = multer({ storage: storage })
