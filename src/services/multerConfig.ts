import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = path.resolve(__dirname, '..', '..', 'uploads');

// Verifica se a pasta existe, caso contrário, cria a pasta
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

export const upload = multer({ storage: storage });
