const express = require("express");
const router = express.Router();
const { sendSuccessResponse } = require("../utils/response")

/* GET home page. */
router.get("/", function (req, res) {
  return sendSuccessResponse(res, "Welcome to Face Recognition - The API")
});

module.exports = router;
