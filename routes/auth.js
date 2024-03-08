var express = require("express");
var router = express.Router();
var utils = require("../utils")
var { db } = require("../APIs/knex")

/* POST user credentials to registers a new user. */
router.post("/register", function (req, res, next) {
  const {email, name, password} = req.body;

  console.log( {email, name, password})

  if (utils.isValidStringCharacters([email, name, password])) {
    db('users').insert({
      email, 
      name,
      joined: new Date()
    }, ["*"]).then(user => res.json(user[0])).catch((error) => res.status(400).json("Unable to register user"))
  } else {
    // todo: figure out how to send something wrong with request error.
    res.status(400).json("Unable to register user.")
  }


});

/* POST user credential to authenticate existing user. */
router.post("/signin", function (req, res, next) {
  const response = {
    token: "saasfjskejknfssasasakandbask",
  };

  res.json(response);
});

module.exports = router;
