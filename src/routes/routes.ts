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
routes.route('/api/usuario')
  .get('/api/usuario/:id', userController.get)
  .post("/api/usuario", userController.create)
  // routes.update("api/usuarios/:id", userController.update)
  .get("/api/usuarios", userController.list)
  .delete("/api/usuario/:id", userController.delete)


export { routes };