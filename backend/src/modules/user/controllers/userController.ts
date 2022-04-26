import { Request, Response } from 'express'
import { CreateUser } from '../services/create'
import { GetUsers } from '../services/get';

export default class UserController {
  async get(_req: Request, res: Response) {
    const getUsersService = new GetUsers();
    const users = await getUsersService.execute()

    return res.status(200).json(users)
  }

  async create(req: Request, res: Response) {
    const createUserService = new CreateUser();
    const user = await createUserService.execute(req.body)

    return res.status(201).json(user)
  }

  // async update(req: Request, res: Response) {
  //   const updateUserService = container.resolve(UpdateUserService)
  //   const user = await updateUserService.execute(req.body)

  //   return res.status(200).json(user)
  // }

  // async delete(req: Request, res: Response) {
  //   const deleteUserService = container.resolve(DeleteUserService)
  //   const user = await deleteUserService.execute(req.params.id)

  //   return res.status(200).json(user)
  // }
}
