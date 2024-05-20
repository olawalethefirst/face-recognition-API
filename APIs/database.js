const knex = require("knex");
const { database: databaseCredentials } = require("../constants");

const db = knex({
  client: "pg",
  connection: {
    host: databaseCredentials.host,
    port: databaseCredentials.port,
    user: databaseCredentials.user,
    password: databaseCredentials.password,
    database: databaseCredentials.name,
    ssl: true,
  },
});

class database {
  static async insertInTable(
    tableName,
    record,
    returning = ["*"],
    transactionRef = null
  ) {
    return (transactionRef || db)(tableName).insert(record, returning);
  }

  static async selectTableRecords(
    tableName,
    returning = ["*"],
    transactionRef = null
  ) {
    return (transactionRef || db)(tableName).select(returning);
  }

  static async findInTable(
    tableName,
    conditions,
    returning = ["*"],
    transactionRef = null
  ) {
    return (transactionRef || db)(tableName)
      .where(conditions)
      .select(returning);
  }

  static async createTransaction() {
    return db.transaction();
  }
}

database.dbInstance = db;

module.exports = database;
