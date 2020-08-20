import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDataBase';

export default async function getUser(req: Request, res: Response) {
    try {
        if(!req.headers.authorization){
            throw new Error("Invalid Token");
        }
        const id: string = req.params.id;
        const user = new UserDatabase;
        const result = await user.getUserById(id);

        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}