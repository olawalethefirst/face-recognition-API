const express = require("express");
const router = express.Router();
const db = require('../APIs/database')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response')
const { validatePhotoRoute } = require('../middlewares/validators/photo')
const { errorMessages } = require("../constants")

/* POSTS photo to detect the faces in it. */
router.post("/", validatePhotoRoute, async function (req, res, next) {
  const { id } = req.body

  try {
      const entriesArr = await db("users").where("id", "=", id).increment("entries", 1).returning("entries")
      
      return sendSuccessResponse(res, "Face(s) detected successfuly", entriesArr[0].entries)
    } catch (error) {
      return sendErrorResponse(res, 500, errorMessages.internalServerError)
  }

});

module.exports = router;
