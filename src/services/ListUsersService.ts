import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUsersService {

    async execute() {

        const usersRespositories = getCustomRepository(UsersRepositories);

        const users = await usersRespositories.find();

        return classToPlain(users);
    }
}

export { ListUsersService }