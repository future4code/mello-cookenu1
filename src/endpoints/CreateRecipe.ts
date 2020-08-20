import { Request, Response } from 'express';
import moment from 'moment';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/idGenerator';

export default async function createRecipe(req: Request, res: Response) {
    try {
        if(!req.body.title){
            throw new Error("Invalid Title");
        }
        if(!req.body.description){
            throw new Error("Invalid Description");
        }
        if(!req.headers.authorization){
            throw new Error("Invalid Token");
        }
        const token = req.headers.authorization;
        const authenticator = new Authenticator;
        const idUser = authenticator.getData(token)
        const idGenerator = IdGenerator.generate();
        const recipe = new RecipeDatabase;
        
        recipe.createRecipe(idGenerator, req.body.title, req.body.description, moment().format("YYYY-MM-DD"), idUser.id);

        res.status(200).send({
            message: "Receita criada"});
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }

}