import { Request, Response } from "express";

import { ListUsersService } from "../services/ListUsersService";

class ListUsersController {

    async handle( request : Request, response : Response) {

        const listUsersService = new ListUsersService();

        const list = await listUsersService.execute();

        return response.json(list);
    }
}

export { ListUsersController }