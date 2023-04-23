import { Request, Response } from "express";
import { CreateComplimentService } from "../service/CreateComplimentService";

class CreateComplimentController {
  async handle(req: Request, res: Response) {
    const createComplimentService = new CreateComplimentService();
    const { tag_id, user_receiver, message } = req.body;
    const { user_id } = req;

    const compliemnt = await createComplimentService.execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message
    });

    return res.status(201).json(compliemnt);

  }
}

export { CreateComplimentController };