import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../service/ListUserSendComplimentsService";

class ListUserSendComplimentsControlller {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const listUserSendComplimentsService = new ListUserSendComplimentsService();

    const compliments = await listUserSendComplimentsService.execute(user_id);


    return res.status(200).json(compliments);

  }
}

export { ListUserSendComplimentsControlller };
