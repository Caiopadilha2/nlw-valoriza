import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";

class ListUsersService {
  async execute() {
    const usersListRepositories = getCustomRepository(UserRepositories);

    const users = await usersListRepositories.find();

    if (!users) {
      throw new Error("No users yet");
    }
 
    return users;
  }
}

export { ListUsersService };