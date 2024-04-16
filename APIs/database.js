const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "",
    password: "",
    database: "face-recognition",
  },
});

class database {
  static async  insertInTable(
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
    return  db.transaction();
  }
}

database.dbInstance = db;

module.exports = database;
