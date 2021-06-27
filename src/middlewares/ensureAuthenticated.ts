import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request : Request, response : Response, nextFunction : NextFunction) {

    const authToken = request.headers.authorization;
    
    if(!authToken) {
        return response.status(401).end();
    }

    const token = authToken.split(" ")[1];

    try {
        const { sub } = verify(token , "5c5b3f083ab213678e2ce511a814d7ef") as IPayload;
        
        request.user_id = sub;
   
        return nextFunction();
   
    }catch (err) {
        return response.status(401).end();
    }
}