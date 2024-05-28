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
routes.put('/api/usuarios/upload/:id',authMiddlwares , userController.uploadImg);

//user
routes.route('/api/usuarios/:id')
  .get(authMiddlwares, userController.get)
  .put(authMiddlwares, userController.update)
  .delete(authMiddlwares, userController.delete)

routes.route('/api/usuarios')
  .get(authMiddlwares, userController.list)
  .post(authMiddlwares, userController.create)

export { routes };


