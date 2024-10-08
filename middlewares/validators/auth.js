const { body, validationResult } = require("express-validator");
const { sendErrorResponse } = require("../../utils/response");
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
      let user;
      
      try {
        user = await findUserByEmail(value);
      } catch (error) {
        console.error({name: "error finding user by email", error})
        
        throw new Error('Error validating email');
      }

      if (user) {
        throw new Error('E-mail already in use');
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsArr = errors.array();

      return sendErrorResponse(
        res,
        400,
        errorsArr[0].msg,
        errorsArr
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
      const errorsArr = errors.array();
      
      return sendErrorResponse(
        res,
        400,
        errorsArr[0].msg,
        errorsArr
      );
    }

    next();
  },
];

module.exports = {
  validateRegisterRoute,
  validateSignInRoute,
};
