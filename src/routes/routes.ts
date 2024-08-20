import { Router } from 'express'
import { AuthController } from '@/controllers/AuthController'
import { UserController } from '@/controllers/UserController'
import { authMiddleware } from '@/middlewares/auth'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '@/services/swagger.json'
import { upload } from '@/services/multerConfig'

const routes = Router()
const authController = new AuthController()
const userController = new UserController()

// Documentation
routes.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// Auth
routes.post('/api/login', authController.login)

// User
routes.route('/api/usuarios')
  .post(userController.create)
  .get(userController.list)

routes.route('/api/usuarios/:id')
  .get(authMiddleware, userController.get)
  .put(/*authMiddleware,*/ userController.update)
  .delete(/*authMiddleware,*/ userController.delete)

// Upload image
routes.put('/api/usuarios/upload/:id', upload.single('file'), userController.uploadImg)

export { routes }
