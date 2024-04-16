const express = require("express");
const router = express.Router();
const db = require("../APIs/database")
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response')
const { validateUserRoute } = require('../middlewares/validators/user')
const { errorMessages } = require("../constants");
const UserController = require("../controllers/UserController");

/* GET a user. */
router.get("/:id", validateUserRoute, UserController.getUser);

module.exports = router;
