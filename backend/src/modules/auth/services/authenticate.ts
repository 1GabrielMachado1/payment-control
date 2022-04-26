import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import AppError from "../../../errors/appError";

import { GetUserByEmail } from "../../user/services/getByEmail";
import IAuthenticateUserDTO from "../dtos/iAuthenticateUserDTO";
import { CreateRefreshToken } from "./createRefreshToken";

class AuthenticateUser {
  async execute({ email, password }: IAuthenticateUserDTO) {
    const findUserByEmail = new GetUserByEmail();
    const existingUser = await findUserByEmail.execute(email);
    const authSecret = process.env.AUTH_SECRET;

    if (!authSecret) {
      throw new AppError('Environment variable AUTH_SECRET not set', 400);
    }

    if (!existingUser) {
      throw new AppError("Email or password incorrect", 401);
    }

    const passwordMatch = await compare(password, existingUser.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect", 401);
    }

    const tokenPayload = { email: existingUser.email, name: existingUser.name };

    const token = sign(tokenPayload, process.env.AUTH_SECRET, {
      subject: existingUser.id,
      expiresIn: "3h"
    })

    const createRefreshToken = new CreateRefreshToken();
    const refreshToken = await createRefreshToken.execute(existingUser.id);

    return { token, refreshToken };
  }
}

export { AuthenticateUser };
