import { EntityRepository, Repository } from 'typeorm'
import { User } from "../entities/User";

@EntityRepository(User)
class UserRepositories extends Repository<User> {
  // ctrl + espaço me da acesso a todos os metodos do repository
  
}

export { UserRepositories };