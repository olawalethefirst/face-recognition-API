const UserModel = require("../models/UserModel");
const AuthModel = require("../models/AuthModel");
const { registerPassword, validatePassword } = AuthModel;
const { createUser, findUserByEmail } = UserModel;
const { createTransaction } = require("../APIs/database");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { errorMessages } = require("../constants");
const { generateToken } = require("../APIs/jwt");

class AuthController {
  static async registerUser(req, res) {
    const { email, name, password } = req.body;
    const user = new UserModel(email, name);
    const loginData = new AuthModel(email, password);

    const transactionRef = await createTransaction();

    try {
      await registerPassword(loginData, transactionRef);

      const newUser = await createUser(user, transactionRef);

      const tokenPayload = { ...newUser };
      // remove user identifiable personal data
      delete tokenPayload.name;
      delete tokenPayload.email;
      const token = generateToken(tokenPayload);

      transactionRef.commit();

      return sendSuccessResponse(res, "Registered user successfully", {
        token,
        user: newUser,
      });
    } catch (error) {
      console.error({ name: "Error registering user", error });

      transactionRef.rollback();

      return sendErrorResponse(res, 500, errorMessages.internalServerError);
    }
  }

  static async signInUser(req, res) {
    const { email, password } = req.body;

    try {
      const validationResult = await validatePassword(email, password);
      const user = await findUserByEmail(email);

      if (user) {
        const tokenPayload = { ...user };
        // remove user identifiable personal data
        delete tokenPayload.name;
        delete tokenPayload.email;
        const token = generateToken(tokenPayload);

        if (validationResult.successful) {
          return sendSuccessResponse(res, "Signed in successfully", {
            token,
            user,
          });
        }
      }

      return sendErrorResponse(res, 401, "Invalid credentials provided");
    } catch (error) {
      console.error({ name: "Error signing in user", error });

      return sendErrorResponse(res, 500, errorMessages.internalServerError);
    }
  }
}

module.exports = AuthController;
