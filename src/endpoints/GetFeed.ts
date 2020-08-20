import { Request, Response } from 'express';
import moment from 'moment';
import { Authenticator } from '../services/Authenticator';
import { RecipeDatabase } from '../data/RecipeDatabase';

export default async function getFeed(req: Request, res: Response) {
    try {
        if(!req.headers.authorization) {
            throw new Error ("Invalid Token");
        }
        const authenticator = new Authenticator;
        const recipe = new RecipeDatabase;
        const id = authenticator.getData(req.headers.authorization);
        const result = await recipe.getFeedRecipe(id.id);
        result.forEach((element: any) => {
            element.createAt = moment(element.createAt).format("DD/MM/YYYY")
        });
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}