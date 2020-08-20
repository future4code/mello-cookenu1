import { Request, Response } from 'express';
import { Authenticator } from '../services/Authenticator';
import { FollowersDatabase } from '../data/FollowersDatabase';

export default async function follow (req: Request, res: Response) {
    try {
        const token = req.headers.authorization;
        if(!req.headers.authorization){
            throw new Error ("Invalid Token");
        }
        const authenticator = new Authenticator;
        const user = new FollowersDatabase;

        const idUserToFollow = req.body.userToFollowId;
        const idToken = authenticator.getData(token as string);
        const result = await user.followerUser(idToken.id,idUserToFollow);
        
        res.status(200).send({
            message: result
            });
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }

}