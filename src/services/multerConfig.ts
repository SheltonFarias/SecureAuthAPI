import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the storage strategy
export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath = path.resolve('uploads');

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  }
});
