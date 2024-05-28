import multer from 'multer';
import path from 'path';

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/'); // This is the directory relative to the root of your server
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  }
});
