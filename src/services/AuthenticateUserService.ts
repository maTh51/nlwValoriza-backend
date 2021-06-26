import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password} : IAuthenticateRequest) {

        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        const token = sign(
            {
                email: user.email
            },
            "5c5b3f083ab213678e2ce511a814d7ef",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        console.log(token)

        return token;
    }
}

export { AuthenticateUserService }