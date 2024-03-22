const express = require("express");
const router = express.Router();
const utils = require("../utils");
const db = require("../APIs/database");
const { hashText, compareHash } = require('../APIs/hash');

/* POST user credentials to registers a new user. */
router.post("/register", function (req, res, next) {
  const {email, name, password} = req.body;

  const hash = hashText(password)

  if (utils.isValidStringCharacters(email, name, password)) {
    db.transaction(async (trx) => {
      const emails = await trx('login').insert(
        {
          email,
          hash
        }, "email"
      )        
      const loginEmail = emails[0];
      const users = await trx('users').insert({
          email: loginEmail.email,
          name,
          joined: new Date()
        }, "*")
        
        return res.json(users[0])
      }).catch(() => res.status(400).json("Unable to register user"))
  } else {
    // todo: figure out how to send something wrong with request error.
    res.status(400).json("Invalid parameter() specified.")
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
