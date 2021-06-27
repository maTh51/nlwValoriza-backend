import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
    user_sender: string;
    user_receiver: string;
    tag: string;
    message: string;    
}

class CreateComplimentService {

    async execute( { user_sender, user_receiver, tag, message } : IComplimentRequest ) {

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver");
        }
        
        const userReceiveExists = await usersRepositories.findOne(user_receiver);

        if(!userReceiveExists) {
            throw new Error("User Receiver not exists");
        }

        

        const compliment = complimentsRepositories.create({
            tag_id: tag,
            user_sender_id: user_sender,
            user_receiver_id: user_receiver,
            message
        })

        await complimentsRepositories.save(compliment); 

        return compliment;

    }

}

export { CreateComplimentService }