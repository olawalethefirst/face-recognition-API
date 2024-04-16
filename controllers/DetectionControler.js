const { errorMessages } = require("../constants")
const { incrementUserEntries } = require("../models/UserModel")
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response")

class DetectionController {
    static async detectFaces (req, res)  {
        const { id } = req.body
        
        try {
            const entriesCount = await incrementUserEntries(id)
            
            return sendSuccessResponse(res, "Face(s) detected successfuly", entriesCount)
        } catch {
            return sendErrorResponse(res, 500, errorMessages.internalServerError)
        }

    }
}

module.exports = DetectionController;
