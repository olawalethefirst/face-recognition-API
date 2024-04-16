const { insertInTable, findInTable } = require("../APIs/database");
const { hashText, compareHash } = require("../APIs/hash");

class AuthModel {
  constructor(email, password) {
    this.email = email;
    this.hash = hashText(password);
  }

  static async registerPassword(authData, transactionRef) {
    const emailArr = await insertInTable(
      "login",
      authData,
      ["email"],
      transactionRef
    );

    return emailArr[0];
  }

  static async loginUser() {}
}

module.exports = AuthModel;
