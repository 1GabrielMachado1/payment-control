import { prismaClient } from "../../../database/client"

class DeleteRefreshTokensByUser {
  async execute(userId: string) {
    const deletedRefreshToken = await prismaClient.refreshToken.deleteMany({
      where: {
        userId,
      }
    });

    return deletedRefreshToken;
  }
}

export { DeleteRefreshTokensByUser };
