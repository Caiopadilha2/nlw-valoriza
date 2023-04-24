import { Request, Response } from "express";
import { ListTagsServices } from "../service/ListTagsService";

class ListTagsController {
  async handle(req: Request, res: Response) {
    const listTagsService = new ListTagsServices();

    const tags = await listTagsService.execute();

    return res.status(200).json(tags);
  }
}

export { ListTagsController };