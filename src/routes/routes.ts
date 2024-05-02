const { Router } = require('express')
import { AuthController } from '@/controllers/AuthController';
import { UserController } from '@/controllers/UserController';
import { authMiddlwares } from '@/middlewares/auth';

const authController = new AuthController()
const userController = new UserController()

const routes = Router();

// auth
routes.post('/api/login', authController.login)

//user
routes.route('/api/usuarios/:id')
  .get(authMiddlwares, userController.get) 
  .put(userController.update) 
  .delete(userController.delete)

routes.route('/api/usuarios')
  .get(authMiddlwares, userController.list) 
  .post( userController.create)

export { routes };
