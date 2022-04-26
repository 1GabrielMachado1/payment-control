import { prismaClient } from "../../../database/client"

class GetUsers {
  async execute() {
    const users = await prismaClient.user.findMany();

    return users;
  }
}

export { GetUsers };
