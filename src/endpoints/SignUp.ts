import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDataBase';
import { IdGenerator } from '../services/idGenerator';
import { HashManager } from '../services/HashManager';

export default async function signUp (req: Request, res: Response) {
    try {
        if(!req.body.name || !req.body.email || !req.body.password){
            throw new Error ("Invalid Entry");
        }

        if(req.body.password.length < 6){
            throw new Error ("Short Password");
        }
        
        const user = new UserDatabase;
        const id = IdGenerator.generate();
        const hash = new HashManager();
        const isPassword = await hash.hash(req.body.password);

        await user.createUser(id, req.body.email, req.body.name, isPassword)

        res.status(200).send({
            message: "Usuário criado com sucesso."
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}