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
  .get('/:id', userController.get)
  .post("/", userController.create)
  // routes.update("/:id", userController.update)
  .get("/", userController.list)
  .delete("/:id", userController.delete)


export { routes };