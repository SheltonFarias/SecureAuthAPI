import { AuthController } from '@/controllers/AuthController';
import { UserController } from '@/controllers/UserController';
import { authMiddlwares } from '@/middlewares/auth';
import multer from 'multer';
import { storage } from '@/services/multerConfig'

const upload = multer({ storage: storage })
const { Router } = require('express')
const routes = Router();

const authController = new AuthController()
const userController = new UserController()

// auth
routes.post('/api/login', authController.login)

//user
routes.route('/api/usuarios/:id')
  .get( userController.get)
  .put( userController.update)
  .delete( userController.delete)

routes.route('/api/usuarios')
  .get( userController.list)
  .post( userController.create)

  routes.post('/upload', upload.single('file'), (req, res) => {
    return res.json(req.file.filename);
  })

  routes.put('/api/usuarios/:id/upload', upload.single('file'), userController.uploadImage);

export { routes };