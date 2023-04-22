import { UserRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs"

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean,
  password: string
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const UserRepository = getCustomRepository(UserRepositories);
    const userAlreadyExists = await UserRepository.findOne({
      email
    });

    if (!email) {
      throw new Error("Email incorrect")
    }

    if (userAlreadyExists) {
      throw new Error("User already exists")
    };

    const passwordHash = await hash(password, 8);

    const user = UserRepository.create({
      name,
      email,
      admin,
      password: passwordHash, 
    });

    await UserRepository.save(user);

    return user;
  }
}

export { CreateUserService };