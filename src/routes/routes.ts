const { Router } = require('express')
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
import { authMiddlwares } from "../middlewares/auth";

const userController = new UserController()
const authController = new AuthController()

const routes = Router();


routes.post("/users", userController.create)
routes.get("/users", userController.get)

// auth
routes.post('/api/login', authController.authenticate)
routes.get('/api/authentication', authMiddlwares, userController.get)
// routes.post('/api/refresh', 'AuthController.refresh')

export { routes };