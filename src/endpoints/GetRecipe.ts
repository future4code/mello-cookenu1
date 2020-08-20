import { Request, Response } from 'express';
import { RecipeDatabase } from '../data/RecipeDatabase';

export default async function getRecipe(req: Request, res: Response) {
    try {
        if(!req.params.id){
            throw new Error ("Invalid Id");
        }
        const recipe = new RecipeDatabase;
        const result = await recipe.getRecipeById(req.params.id)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}