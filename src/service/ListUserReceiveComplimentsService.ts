import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";



class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id
      },
    });
    // console.log(compliments)

    if (compliments.length === 0) {
      throw new Error("You haven't received any compliments yet :(")
    }

    return compliments;
  }
}

export { ListUserReceiveComplimentsService };