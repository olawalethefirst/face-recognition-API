const express = require("express");
const router = express.Router();
const db = require("../APIs/database");
const { hashText, compareHash } = require('../APIs/hash');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response')
const { validateRegisterRoute, validateSignInRoute } = require('../middlewares/validators/auth')
const { errorMessages } = require("../constants")

/* POST user credentials to registers a new user. */
router.post("/register", validateRegisterRoute, function (req, res, next) {
  const {email, name, password} = req.body;

  const hash = hashText(password)
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
        
        return sendSuccessResponse(res, "Registered user successfully", users[0]) 
      }).catch((error) => {
        // Todo: "create custom validation to check if email exists before"
        let errorMessage
        let statusCode

        if (error.detail === "Key (email)=(email1) already exists.") {
          errorMessage = "Email address is already in use"
          statusCode = 400
        } else {
          statusCode = 500
          errorMessage = errorMessages.internalServerError;
        }

        return sendErrorResponse(res, statusCode, errorMessage);
      })
});

/* POST user credential to authenticate existing user. */
router.post("/signin", validateSignInRoute, async function (req, res, next) {
  const { email, password } = req.body;
  
  try {
    const loginHashArr = await db("login").select("hash").where("email", "=", email)
    
    if (loginHashArr.length > 0) {  
      const loginHash = loginHashArr[0]?.hash
      
      if (compareHash(password, loginHash)) {
        return sendSuccessResponse(res, "Signed in successfully")
      } else throw new Error("")

    } else return sendErrorResponse(res, 401, "Invalid credentials provided");
  } catch(error) {
    return sendErrorResponse(res, 500, errorMessages.internalServerError);
  }
});

module.exports = router;
