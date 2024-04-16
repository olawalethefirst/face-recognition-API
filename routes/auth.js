const express = require("express");
const router = express.Router();
const db = require("../APIs/database");
const { hashText, compareHash } = require("../APIs/hash");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/response");
const {
  validateRegisterRoute,
  validateSignInRoute,
} = require("../middlewares/validators/auth");
const { errorMessages } = require("../constants");
const AuthController = require("../controllers/AuthController");

/* POST user credentials to registers a new user. */
router.post(
  "/register",
  validateRegisterRoute,
  AuthController.registerUser
);

/* POST user credential to authenticate existing user. */
router.post("/signin", validateSignInRoute, AuthController.signInUser);

module.exports = router;
