import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";



class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id
      },
    });

    if (compliments.length === 0) {
      throw new Error("You haven't sent any compliments yet");
    }

    return compliments;
  }
}

export { ListUserSendComplimentsService };