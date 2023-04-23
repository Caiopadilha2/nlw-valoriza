import { Request, Response, NextFunction } from "express"
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  // const admin = true
  // if (admin) {
  //   return next();
  // }
  
  const { user_id } = req;
  // Verificar se esse usuário é um admin
  const usersRepositories = getCustomRepository(UserRepositories);
  const user = await usersRepositories.findOne(user_id);
   
  if (user.admin) {
    return next();
  }

  return res.status(401).json({
    message: "You're not Admin!"
  })
}
