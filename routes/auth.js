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
      }).catch((error) => {
        // Todo: "create custom validation"
        let errorMessage 
        if (error.detail === "Key (email)=(email1) already exists.") {
          errorMessage = "Email address is already in use"
        } else {
          errorMessage = "Unable to register user"
        }

        return res.status(400).json({ message: errorMessage })
      })
  } else {
    // todo: figure out how to send something wrong with request error.
    res.status(400).json("Invalid parameter() specified.")
  }


});

/* POST user credential to authenticate existing user. */
router.post("/signin", async function (req, res, next) {
  const { email, password } = req.body;
  console.log("email & passsword: ", email, password)
  try {
    const loginHashArr = await db("login").select("hash").where("email", "=", email)
    console.log("loginHashArr: ", loginHashArr)
    
    if (loginHashArr.length > 0) {  
      const loginHash = loginHashArr[0]?.hash
      console.log("loginHash: ", loginHash)
      
      if (compareHash(password, loginHash)) {
        return res.json("successful")
      } else throw new Error("")

    } else throw new Error("")
  } catch(error) {
    return res.status(401).json("Invalid credentials provided")
  }
  const response = {
    token: "saasfjskejknfssasasakandbask",
  };

  res.json(response);
});

module.exports = router;
