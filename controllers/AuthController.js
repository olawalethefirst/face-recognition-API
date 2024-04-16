const UserModel = require("../models/UserModel");
const AuthModel = require("../models/AuthModel");
const { registerPassword } = AuthModel;
const { createUser } = UserModel;
const { createTransaction } = require("../APIs/database");
const { hashText, compareHash } = require("../APIs/hash");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { errorMessages } = require("../constants");

class AuthController {
  static async registerUser(req, res) {
    const { email, name, password } = req.body;
    const user = new UserModel(email, name);
    const loginData = new AuthModel(email, password);

    console.log("loginData: ", loginData);

    try {
      await createTransaction(async (transactionRef) => {
        await registerPassword(loginData, transactionRef);

        const newUser = await createUser(user, transactionRef);

        return sendSuccessResponse(
          res,
          "Registered user successfully",
          newUser
        );
      });
    } catch (err) {
      console.log("error: ", err);
      return sendErrorResponse(res, 500, errorMessages.internalServerError);
    }
  }

  static async signInUser() {}
}

module.exports = AuthController;

// const {
//   validateRegisterRoute,
//   validateSignInRoute,
// } = require("../middlewares/validators/auth");

// /* POST user credentials to registers a new user. */
// router.post("/register", validateRegisterRoute, function (req, res, next) {

//   db.transaction(async (trx) => {
//     const emails = await trx("login").insert(
//       {
//         email,
//         hash,
//       },
//       "email"
//     );
//     const loginEmail = emails[0];
//     const users = await trx("users").insert(
//       {
//         email: loginEmail.email,
//         name,
//         joined: new Date(),
//       },
//       "*"
//     );

//
//   }).catch((error) => {
//     // Todo: "create custom validation to check if email exists before"
//     let errorMessage;
//     let statusCode;

//     if (error.detail === "Key (email)=(email1) already exists.") {
//       errorMessage = "Email address is already in use";
//       statusCode = 400;
//     } else {
//       statusCode = 500;
//       errorMessage = ;
//     }

//   });
// });

// /* POST user credential to authenticate existing user. */
// router.post("/signin", validateSignInRoute, async function (req, res, next) {
//   const { email, password } = req.body;

//   try {
//     const loginHashArr = await db("login")
//       .select("hash")
//       .where("email", "=", email);

//     if (loginHashArr.length > 0) {
//       const loginHash = loginHashArr[0]?.hash;

//       if (compareHash(password, loginHash)) {
//         return sendSuccessResponse(res, "Signed in successfully");
//       }
//     }

//     return sendErrorResponse(res, 401, "Invalid credentials provided");
//   } catch (error) {
//     return sendErrorResponse(res, 500, errorMessages.internalServerError);
//   }
// });

// module.exports = router;
