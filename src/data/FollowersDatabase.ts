import { BaseDB } from "./BaseDatabase";

export class FollowersDatabase extends BaseDB {
  private static TABLE_NAME = "Followers";

  public async followerUser(idUser: string, idFollower: string): Promise<void> {
    await this.getConnection()
      .insert({
        idUser,
        idFollower
      })
      .into(FollowersDatabase.TABLE_NAME);

    await BaseDB.destroyConnection()
  }
}