import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer"

class ListTagsServices {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    const tags = await tagsRepositories.find();

    if (!tags) {
      throw new Error("No tags yet.");
    }

    return classToPlain(tags);
  }
}

export { ListTagsServices };