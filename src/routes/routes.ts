import { AuthController } from '@/controllers/AuthController';
import { UserController } from '@/controllers/UserController';
import { authMiddleware } from '@/middlewares/auth';

const { Router } = require('express')
const routes = Router();
const authController = new AuthController()
const userController = new UserController()

// auth
routes.post('/api/login', authController.login)

// upload image
// routes.put('/api/usuarios/upload/:id', userController.uploadImg);

//user
routes.route('/api/usuarios')
  .post( userController.create)
  .get(userController.list)

routes.route('/api/usuarios/:id')
  .get(authMiddleware, userController.get)
  .put(authMiddleware, userController.update)
  .delete(authMiddleware, userController.delete)

export { routes };