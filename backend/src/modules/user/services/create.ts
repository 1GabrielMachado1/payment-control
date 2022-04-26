import { hash } from "bcryptjs"
import { prismaClient } from "../../../database/client"
import AppError from "../../../errors/appError";
import ICreateUserDTO from "../dtos/iCreateUserDTO";
import { GetUserByEmail } from "./getByEmail";

class CreateUser {
  async execute({ email, name, password }: ICreateUserDTO) {
    const findUserByEmail = new GetUserByEmail();
    const userAlreadyExists = await findUserByEmail.execute(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists", 409);
    }

    const passwordHash = await hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password: passwordHash
      }
    });

    return user;
  }
}

export { CreateUser };
