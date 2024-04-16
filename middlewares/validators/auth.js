const { body, validationResult } = require("express-validator");
const { sendErrorResponse } = require("../../utils/response");
const { errorMessages } = require("../../constants");

const validateRegisterRoute = [
  body("email")
    .notEmpty()
    .withMessage("Email string is required")
    .isEmail()
    .withMessage("Invalid email specified"),
  body("name")
    .notEmpty()
    .withMessage("Name string is required")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("Name must be between 5 and 100 characters"),
  body("password")
    .notEmpty()
    .withMessage("Password string is required")
    .isLength({ min: 8 })
    .withMessage("Password must have a minimum of 8 characters")
    .isLength({ max: 100 })
    .withMessage("Password must have a maximum of 100 characters"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return sendErrorResponse(
        res,
        400,
        errorMessages.valiadationError,
        errors.array()
      );
    }

    next();
  },
];

const validateSignInRoute = [
  body("email")
    .notEmpty()
    .withMessage("Email string is required")
    .isEmail()
    .withMessage("Invalid email specified"),
  body("password").notEmpty().withMessage("Password string is required"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return sendErrorResponse(
        res,
        400,
        errorMessages.valiadationError,
        errors.array()
      );
    }

    next();
  },
];

module.exports = {
  validateRegisterRoute,
  validateSignInRoute,
};
