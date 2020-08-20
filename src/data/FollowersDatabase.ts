import { BaseDB } from "./BaseDatabase";

export class FollowersDatabase extends BaseDB {
  private static TABLE_NAME = "Followers";

  public async followerUser(idUser: string, idFollower: string): Promise<void> {
    try{
      const result = await this.getConnection()
      .select("*")
      .into(FollowersDatabase.TABLE_NAME);

      if(result[0] !== undefined) {
        throw new Error ("Já segue");
      }
        await this.getConnection()
          .insert({
            idUser,
            idFollower
          })
          .into(FollowersDatabase.TABLE_NAME);

        await BaseDB.destroyConnection();
      } catch (error) {
        return error.message;
      }
  }
}