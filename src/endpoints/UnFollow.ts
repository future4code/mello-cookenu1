import { Request, Response } from 'express';
import { Authenticator } from '../services/Authenticator';
import { FollowersDatabase } from '../data/FollowersDatabase';

export default async function unFollow(req: Request, res: Response) {
    try{
        const token = req.headers.authorization;
        if(!req.headers.authorization){
            throw new Error ("Invalid Token");
        }
        if(!req.body.userToUnfollowId){
            throw new Error ("Usuário não especificado");
        }

        const authenticator = new Authenticator;
        const follow = new FollowersDatabase;
        const idFollower = authenticator.getData(token as string);
        const idUser = req.body.userToUnfollowId
        await follow.unfollow(idUser, idFollower.id)

        res.status(200).send({
            message: "Unfollowed successfully"
        })
    } catch(error) {
        res.status(400).send({
            message: error.message
        })
    }
}