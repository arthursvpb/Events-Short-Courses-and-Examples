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
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UserRepositories);

    if (user_sender === user_receiver) {
      throw new Error(`You can't compliment yourself! :P`);
    }

    const userReceiverExists = await usersRepositories.findOne({
      id: user_receiver,
    });

    if (!userReceiverExists) {
      throw new Error("User receiver does not exists");
    }

    const compliment = complimentsRepositories.create({
      tag_id: tag_id,
      user_sender: user_sender,
      user_receiver: user_receiver,
      message: message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
