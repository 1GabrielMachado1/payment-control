import dayjs from "dayjs"
import { prismaClient } from "../../../database/client"

class CreateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(3, 'day').unix();

    const refreshToken = await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresIn,
      }
    });

    return refreshToken;
  }
}

export { CreateRefreshToken };
