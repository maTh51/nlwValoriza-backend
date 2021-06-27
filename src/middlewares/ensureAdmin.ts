import { Request, Response, NextFunction } from "express";

import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request : Request, response : Response, nextFunction : NextFunction) {

    const { user_id } = request;
    
    const usersRespositories = getCustomRepository(UsersRepositories);

    const { admin } = await usersRespositories.findOne(user_id);
    
    if(!admin) {
        return response.status(401).json({
            error: "Unauthorized"
        })
    }

    return nextFunction();

    
}