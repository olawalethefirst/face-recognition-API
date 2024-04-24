const { verifyToken } = require("../APIs/jwt");
const { sendErrorResponse } = require("../utils/response")
const { errorMessages } = require("../constants")

const validateToken = (req, res, next) => {
    const authorizationString = req.headers.authorization;
    const authorizationArr = authorizationString?.split(" ") 
    const token = authorizationArr?.[1]
    
    if (token) {
        const { successful, data } = verifyToken(token);

        if (successful) {
            req.user = data;

            return next()
        } 
    }

    return sendErrorResponse(res, 401, errorMessages.unathorizedUser)
}

module.exports = {
    validateToken,
}