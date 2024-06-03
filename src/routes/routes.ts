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
// routes.put('/api/usuarios/upload/:id', userController.uploadImg);

//user
routes.route('/api/usuarios')
  .post(authMiddlwares, userController.create)
  .get(userController.list)

routes.route('/api/usuarios/:id')
  .get(authMiddlwares, userController.get)
  .put(authMiddlwares, userController.update)
  .delete(authMiddlwares, userController.delete)


export { routes };