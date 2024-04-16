const { body, validationResult } = require("express-validator");
const { sendErrorResponse } = require("../../utils/response");
const { errorMessages } = require("../../constants");
const { findUserByEmail } = require("../../models/UserModel")

const validateRegisterRoute = [
  body("email")
    .notEmpty()
    .withMessage("E-mail string is required")
    .isEmail()
    .withMessage("Invalid E-mail specified"),
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
    body('email').custom(async value => {
      const user = await findUserByEmail(value);
      
      if (user) {
        throw new Error('E-mail already in use');
      }
    }),
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
    .withMessage("E-mail string is required")
    .isEmail()
    .withMessage("Invalid E-mail specified"),
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
