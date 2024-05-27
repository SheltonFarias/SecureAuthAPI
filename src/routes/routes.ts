import { AuthController } from '@/controllers/AuthController';
import { UserController } from '@/controllers/UserController';
import { authMiddlwares } from '@/middlewares/auth';

const { Router } = require('express')
const routes = Router();

const authController = new AuthController()
const userController = new UserController()

// auth
routes.post('/api/login', authController.login)

// upload image
routes.put('/api/usuarios/upload/:id', userController.uploadImg);

//user
routes.route('/api/usuarios/:id')
  .get( userController.get)
  .put( userController.update)
  .delete( userController.delete)

routes.route('/api/usuarios')
  .get( userController.list)
  .post( userController.create)

export { routes };