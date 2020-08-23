import { BaseDB } from "./BaseDatabase";
import moment from "moment";

export class RecipeDatabase extends BaseDB {
  private static TABLE_NAME = "Recipe";

  public async createRecipe(
    id: string,
    title: string,
    description: string,
    createAt: string,
    creatorUserId: string,
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        title,
        description,
        createAt,
        creator_user_id: creatorUserId
      })
    .into(RecipeDatabase.TABLE_NAME);
    
    await BaseDB.destroyConnection()
  }

  public async getRecipeById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(RecipeDatabase.TABLE_NAME)
      .where({ id });

    return result;
  }

  public async getFeedRecipe(id: string): Promise<any> {
    const result = await this.getConnection().raw(`
      SELECT         
          r.id,         
          r.title,         
          r.description,         
          r.createAt,         
          r.creator_user_id AS userId,        
          u.name AS userName
      FROM ${RecipeDatabase.TABLE_NAME} AS r
      JOIN Users AS u
      ON u.id = r.creator_user_id
      JOIN Followers AS f
      ON f.idFollower = r.creator_user_id
      WHERE  f.idUser = "${id}"
    `)

    await BaseDB.destroyConnection()

    return result[0];
  }

  public async editRecipeId(
    id: string,
    title: string,
    description: string
  ): Promise<void> {
    const date = moment()

    await this.getConnection()
      .update({
        title,
        description,
        createAt: date.format("YYYY-MM-DD")
      })
      .from(RecipeDatabase.TABLE_NAME)
      .where({ id })
    
    await BaseDB.destroyConnection()
  }

  public async deleteRecipe (id: string): Promise<void> {
    await this.getConnection()
      .delete()
      .from(RecipeDatabase.TABLE_NAME)
      .where({ id })
      
    await BaseDB.destroyConnection()    
  }  
}