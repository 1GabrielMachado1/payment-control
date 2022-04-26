import { prismaClient } from "../../../database/client"

class GetUserById {
  async execute(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    return user;
  }
}

export { GetUserById };
