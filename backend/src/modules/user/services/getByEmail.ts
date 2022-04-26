import { prismaClient } from "../../../database/client"

class GetUserByEmail {
  async execute(email: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    return user;
  }
}

export { GetUserByEmail };
