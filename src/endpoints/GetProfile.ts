import { Request, Response } from 'express';
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from '../data/UserDataBase';

export default async function getProfile (req: Request, res: Response) {
    try {
        if(!req.headers.authorization){
            throw new Error("Invalid Token")
        }
        const token = req.headers.authorization;
        const authenticator = new Authenticator;
        const user = new UserDatabase;
        const dataToken = authenticator.getData(token as string);

        const result = await user.getUserById(dataToken.id);
        res.status(200).send(result[0])
    } catch(error){
        res.status(400).send({
            message: error.message
        })
    }

}