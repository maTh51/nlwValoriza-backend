import { Request, Response } from "express"
import { ListTagsService } from "../services/ListTagsService"

class ListTagsController {

    async handle( request : Request, response : Response) {

        const listTagsService = new ListTagsService();

        const list = await listTagsService.execute();

        return response.json(list);
    }
}

export { ListTagsController }