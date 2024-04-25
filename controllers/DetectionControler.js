const { errorMessages } = require("../constants")
const { incrementUserEntries } = require("../models/UserModel")
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response")
const { detectFaces } = require("../APIs/clarifai")

class DetectionController {
    static async detectFaces (req, res)  {
        const { id } = req.user
        const { imageUrl } = req.body
        
        try {
            const { data, successful } = await detectFaces(imageUrl)

            if (!successful) {
                throw new Error
            }

            const entriesCount = await incrementUserEntries(id)
            
            return sendSuccessResponse(res, "Face(s) detected successfuly", { entries: entriesCount, faces: data })
        } catch {
            return sendErrorResponse(res, 500, errorMessages.internalServerError)
        }

    }
}

module.exports = DetectionController;
