const express = require("express");
const router = express.Router();
const db = require("../APIs/database")
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response')
const { validateUserRoute } = require('../middlewares/validators/user')
const { errorMessages } = require("../constants")

/* GET a user. */
router.get("/:id", validateUserRoute, async function (req, res, next) {
  const { id } = req.params;
  try {
    const users = await db.select("*").from("users").where({ id })
    const user = users[0]
    
    if (user) {
      res.json(user);
      return sendSuccessResponse(res, "User fetched successfully")
    } else {
      return sendErrorResponse(res, 404, "User not found")
    }
  } catch (error) {
    return sendErrorResponse(res, 500, errorMessages.internalServerError)
  }
  
});

module.exports = router;
