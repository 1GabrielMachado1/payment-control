import { Router } from 'express'
import { ensureAuthentication } from '../../../middlewares/ensureAuthentication'
import UserController from '../controllers/userController'

const usersRouter = Router()
const usersController = new UserController()

usersRouter.post('/', usersController.create)
usersRouter.get('/', ensureAuthentication, usersController.get)
//usersRouter.get('/:id', usersController.getById)
// usersRouter.put('/', usersController.update)
// usersRouter.delete('/:id', usersController.delete)

export default usersRouter
