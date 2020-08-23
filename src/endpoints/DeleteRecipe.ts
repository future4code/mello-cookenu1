import { Request, Response } from 'express';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Authenticator } from '../services/Authenticator';

export default async function deleteRecipe(req: Request, res: Response) {
  try {
    if(!req.params.id){
        throw new Error ("Invalid Id");
    }

    if(!req.headers.authorization) {
        throw new Error ("Invalid Token");
    }

    const id = req.params.id;
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator;
    const authenticationData = authenticator.getData(token);

    const recipe = new RecipeDatabase;
    const result = await recipe.getRecipeById(id)

    if (authenticationData.role === "normal" && result[0].creator_user_id === authenticationData.id) {
      await recipe.deleteRecipe(id)
      res.status(200).send({message: "Deleted recipe!"})
    } else if (authenticationData.role === "normal" && result[0].creator_user_id !== authenticationData.id) {
      throw new Error("Unauthorized") 
    }
      
    if (authenticationData.role === "admin") {
      await recipe.deleteRecipe(id)
      res.status(200).send({message: "Deleted recipe!"})
    }

  } catch (error) {
    res.status(400).send({
        message: error.message
    })
  }
}    