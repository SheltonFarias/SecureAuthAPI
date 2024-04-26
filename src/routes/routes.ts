const { Router } = require('express')
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { authMiddlwares } from "../middlewares/auth";

const authController = new AuthController()
const userController = new UserController()

const routes = Router();

// auth
routes.post('/api/login', authController.login)

//user
routes.route('/api/usuario/:id')
  .get(authMiddlwares, userController.get) 
//.put(userController.update) 
  .delete(authController, userController.delete)

routes.route('/api/usuario')
  .get(authMiddlwares, userController.list) 
  .post(authMiddlwares, userController.create)

export { routes };
