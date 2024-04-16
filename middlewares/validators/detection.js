const { validationResult, body } = require("express-validator");
const { sendErrorResponse } = require("../../utils/response");
const { errorMessages } = require("../../constants");
const { findUserById } = require("../../models/UserModel");

const validatePhotoRoute = [
  body("id")
    .exists({ values: "undefined" })
    .withMessage("id is required")
    .isInt()
    .withMessage("id must be an integer"),
  body('id').custom(async value => {
    const user = await findUserById(value);
    
    if (!user) {
      throw new Error('User not found');
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

module.exports = {
  validatePhotoRoute,
};
