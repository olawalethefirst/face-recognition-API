const { errorMessages } = require("../constants");
const { findUserById } = require("../models/UserModel");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

class UserController {
    static async getUser (req, res) {
        const { id } = req.user;

        try {
            const user = await findUserById(id);
        
            if (user) {
                return sendSuccessResponse(res, "User fetched successfully", user)
            } else {
                return sendErrorResponse(res, 404, "User not found")
            }
        } catch {
            return sendErrorResponse(res, 500, errorMessages.internalServerError)
        }
    }
}

module.exports = UserController;
