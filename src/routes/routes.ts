import { AuthController } from '@/controllers/AuthController'
import { UserController } from '@/controllers/UserController'
import { authMiddleware } from '@/middlewares/auth'
import { storage } from '@/services/multerConfig'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '@/services/swagger.json'
import express from 'express'
import multer from 'multer'
import path from 'path';

const upload = multer({ storage: storage })
const { Router } = require('express')
const routes = Router();
const authController = new AuthController()
const userController = new UserController()

// documentation
routes.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// auth
routes.post('/api/login', authController.login)

//user
routes.route('/api/usuarios')
  .post(userController.create)
  .get(userController.list)

routes.route('/api/usuarios/:id')
  .get(authMiddleware, userController.get)
  .put(/*authMiddleware,*/ userController.update)
  .delete(/*authMiddleware,*/ userController.delete)

// upload image
routes.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

routes.put('/api/usuarios/upload/:id', upload.single('file'), userController.uploadImg);

export { routes };