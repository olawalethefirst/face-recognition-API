const UserModel = require("../models/UserModel");
const AuthModel = require("../models/AuthModel");
const { registerPassword, validatePassword } = AuthModel;
const { createUser, findUserByEmail } = UserModel;
const { createTransaction } = require("../APIs/database");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const { errorMessages } = require("../constants");
const { generateToken } = require("../APIs/jwt")

class AuthController {
  static async registerUser(req, res) {
    const { email, name, password } = req.body;
    const user = new UserModel(email, name);
    const loginData = new AuthModel(email, password);

    const transactionRef = await createTransaction();

    try {
      await registerPassword(loginData, transactionRef);

      const newUser = await createUser(user, transactionRef);
      const token = generateToken(newUser)

       transactionRef.commit();
      
      return sendSuccessResponse(res, "Registered user successfully", { token });
    } catch (err) {
      transactionRef.rollback();

      return sendErrorResponse(res, 500, errorMessages.internalServerError);
    }
  }

  static async signInUser(req, res) {
    const { email, password } = req.body;

    try {
      const validationResult = await validatePassword(email, password);
      const user = await findUserByEmail(email)
      const token = generateToken(user)

      if (validationResult.successful) {
        return sendSuccessResponse(res, "Signed in successfully", { token });
      } else {
        return sendErrorResponse(res, 401, "Invalid credentials provided");
      }
    } catch {
      return sendErrorResponse(res, 500, errorMessages.internalServerError);
    }
  }
}

module.exports = AuthController;
