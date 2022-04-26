import { sign } from "jsonwebtoken";
import dayjs from "dayjs";

import { prismaClient } from "../../../database/client"
import { GetUserById } from "../../user/services/getById";
import { CreateRefreshToken } from "./createRefreshToken";
import { DeleteRefreshTokensByUser } from "./deleteRefreshTokensByUser";
import AppError from "../../../errors/appError";

class RefreshToken {
  async execute(id: string) {
    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        id,
      }
    });

    if (!refreshToken) {
      throw new AppError("Invalid refresh token", 401);
    }

    const now = dayjs();
    const refreshTokenExpiration = dayjs.unix(refreshToken.expiresIn);
    const refreshTokenExpired = now.isAfter(refreshTokenExpiration);

    if (refreshTokenExpired) {
      throw new AppError("Expired refresh token", 401);
    }

    const getUserById = new GetUserById();
    const user = await getUserById.execute(refreshToken.userId);

    if (!user) {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    const tokenPayload = { email: user.email, name: user.name };

    const newToken = sign(tokenPayload, process.env.AUTH_SECRET, {
      subject: user.id,
      expiresIn: "3h"
    });

    const deleteRefreshTokensByUser = new DeleteRefreshTokensByUser();
    await deleteRefreshTokensByUser.execute(user.id);

    const createRefreshToken = new CreateRefreshToken();
    const newRefreshToken = await createRefreshToken.execute(user.id);

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }
}

export { RefreshToken };
