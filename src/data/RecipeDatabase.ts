import { BaseDB } from "./BaseDatabase";

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
      ON f.idFollower = ${id}
    `)

    await BaseDB.destroyConnection()

    return result[0];
  }
}