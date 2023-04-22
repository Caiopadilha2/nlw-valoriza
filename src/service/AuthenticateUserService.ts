import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest) {
    // verificar se email existe

    const usersRepositories = getCustomRepository(UserRepositories);
    const userExists = await usersRepositories.findOne({
      email
    });

    if (!userExists) {
      throw new Error('Wrong user/password!')
    }
    // verificar se senha está correta

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) {
      throw new Error('Wrong user/password!')
    }

    // Gerar token se senha correta
    const token = sign({
      email: userExists.email},
      "secret_key",
      {
        subject: userExists.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export { AuthenticateUserService }