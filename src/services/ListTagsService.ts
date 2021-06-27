import { getCustomRepository } from "typeorm"
import { classToPlain } from "class-transformer";

import { TagsRepositories } from "../repositories/TagsRepositories"

class ListTagsService {

    async execute() {

        const tagsRespositories = getCustomRepository(TagsRepositories);

        const tags = await tagsRespositories.find();

        return classToPlain(tags);
    }
}

export { ListTagsService }