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

        const userData = {
            email: req.body.email,
            password: req.body.password
        };

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserByEmail(userData.email)

        const hashManager = new HashManager()
        const compareResult = await hashManager.compare(
          userData.password,
          user[0].password
        )

        if (!compareResult) {
          throw new Error ("Invalid password")
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
          id: user[0].id,
          role: user[0].role
        })
        
        res.status(200).send({
          token
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }

}
