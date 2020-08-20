import { BaseDB } from "./BaseDatabase";

export class UserDatabase extends BaseDB {
  private static TABLE_NAME = "Users";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        email,
        name,
        password
      })
    .into(UserDatabase.TABLE_NAME);
    
    await BaseDB.destroyConnection()
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    await BaseDB.destroyConnection()

    return result;
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return result;
  }
}