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

  public async unfollow(idUser: string, idFollower: string): Promise<void> {
    try {
      //ADICIONEI A VERIFICAÇÃO COM O ID DO TOKEN 
      //E O SQL DAVA ERRO PQ NÃO TAVA ENTRE ASPAS
      await this.getConnection().raw(`
        DELETE FROM ${FollowersDatabase.TABLE_NAME} 
        WHERE idUser = "${idUser}" AND idFollower = "${idFollower}";
      `)
      
      await BaseDB.destroyConnection()
    } catch (error) {
      return error.message
    }
  }
}