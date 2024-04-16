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

  static async validatePassword(email, password) {
    let result = { successful: false}

    const loginHashArr = await findInTable("login", { email }, ["email", "hash"])
    
    if (loginHashArr.length > 0) {
      const loginHash = loginHashArr[0]?.hash;

      if (compareHash(password, loginHash)) {
        result.successful = true
      }
    }

    return result
  }
}

module.exports = AuthModel;
