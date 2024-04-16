const { insertInTable, findInTable } = require("../APIs/database");

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

  static async fetchUser(id, transactionRef) {
    const usersArr = await findInTable("users", { id }, ["*"], transactionRef);

    return usersArr[0];
  }
}

module.exports = UserModel;
