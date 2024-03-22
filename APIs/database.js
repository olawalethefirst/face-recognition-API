const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : '',
    password : '',
    database : 'face-recognition'
  }
});

module.exports = db
