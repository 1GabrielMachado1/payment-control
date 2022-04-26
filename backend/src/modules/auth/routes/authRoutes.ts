import { Router } from 'express'
import AuthController from '../controllers/authController'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/login', authController.authenticate)
authRouter.post('/refresh-token', authController.refreshToken)
// usersRouter.get('/:id', usersController.show)
// usersRouter.put('/', usersController.update)
// usersRouter.delete('/:id', usersController.delete)

export default authRouter
