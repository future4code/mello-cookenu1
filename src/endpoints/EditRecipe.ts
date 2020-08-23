import { Request, Response } from 'express';
import { RecipeDatabase } from '../data/RecipeDatabase';
import { Authenticator } from '../services/Authenticator';

export default async function editRecipe(req: Request, res: Response) {
  try {
    if(!req.params.id){
        throw new Error ("Invalid Id");
    }

    if(!req.headers.authorization) {
        throw new Error ("Invalid Token");
    }

    const editData = {
      id: req.params.id, 
      title: req.body.title,
      description: req.body.description
    }

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator;
    const authenticationData = authenticator.getData(token);

    const recipe = new RecipeDatabase;
    const result = await recipe.getRecipeById(editData.id)

    if (authenticationData.role === "normal" && result[0].creator_user_id === authenticationData.id) {
      await recipe.editRecipeId(
        editData.id, 
        editData.title, 
        editData.description
      )

      res.status(200).send({message: "Sucess!"})

    } else if (authenticationData.role === "normal" && result[0].creator_user_id !== authenticationData.id) {
      throw new Error("Unauthorized") 
    }

  } catch (error) {
    res.status(400).send({
        message: error.message
    })
  }
}   