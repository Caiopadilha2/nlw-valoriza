import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}


class CreateComplimentService {
  async execute( {tag_id, user_sender, user_receiver, message} : IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const userRepositories = getCustomRepository(UserRepositories);

    if (user_sender === user_receiver) {
      throw new Error("You cannot send a compliment to yourself.")
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists!")
    }

    const compliemnt = complimentsRepositories.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });

    await complimentsRepositories.save(compliemnt);

    return compliemnt;

  }
}

export { CreateComplimentService };