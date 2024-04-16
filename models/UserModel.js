const { insertInTable, findInTable, dbInstance } = require("../APIs/database");

class UserModel {
  constructor(email, name) {
    this.email = email;
    this.name = name;
    this.joined = new Date();
  }

  static async createUser(user, transactionRef) {
    const usersArr = await insertInTable("users", user, ["*"], transactionRef);

    return usersArr[0];
  }

  static async findUserById(id, transactionRef) {
    const usersArr = await findInTable("users", { id }, ["*"], transactionRef);

    return usersArr[0];
  }
  
  static async findUserByEmail(email, transactionRef) {
    const usersArr = await findInTable("users", { email }, ["*"], transactionRef);

    return usersArr[0];
  }
  
  static async incrementUserEntries(id) {
    const usersArr = await dbInstance("users").where("id", "=", id).increment("entries", 1).returning("entries")

    return usersArr[0]?.entries;
  }
}

module.exports = UserModel;
