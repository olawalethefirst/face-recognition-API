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
  static insertInTable(
    tableName,
    record,
    returning = ["*"],
    transactionRef = null
  ) {
    return (transactionRef || db)(tableName).insert(record, returning);
  }

  static selectTableRecords(
    tableName,
    returning = ["*"],
    transactionRef = null
  ) {
    return (transactionRef || db)(tableName).select(returning);
  }

  static findInTable(
    tableName,
    conditions,
    returning = ["*"],
    transactionRef = null
  ) {
    return (transactionRef || db)(tableName)
      .where(conditions)
      .select(returning);
  }

  static async createTransaction(callback = async () => {}) {
    return db.transaction(async (trx) => {
      await callback(trx);
    });
  }
}

database.connection = db;

module.exports = database;
