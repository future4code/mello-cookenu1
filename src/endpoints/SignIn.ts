import { Request, Response } from 'express';
import { HashManager } from '../services/HashManager';
import { UserDatabase } from '../data/UserDataBase';
import { Authenticator } from '../services/Authenticator';

export default async function signIn (req: Request, res: Response) {
    try {
        if (!req.body.email || req.body.email.indexOf('@') === -1) {
            throw new Error ("Invalid Email");
        }
        if (!req.body.password){
            throw new Error ("Invalid Password");
        }

        const hash = new HashManager;
        const resultPassword = hash.compare(req.body.password, process.env.JWT_KEY as string)

        if(!resultPassword){
            throw new Error ("Invalid Password");
        }

        const user = new UserDatabase;
        const authenticator = new Authenticator;
        const result = await user.getUserByEmail(req.body.email);
        const token = authenticator.generateToken(result[0].id)
        
        res.status(200).send({
            "token": token
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }

}