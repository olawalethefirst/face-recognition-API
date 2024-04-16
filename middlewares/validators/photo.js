const { validationResult, body } = require("express-validator");
const { sendErrorResponse } = require("../../utils/response");
const { errorMessages } = require("../../constants");

const validatePhotoRoute = [
  body("id")
    .exists({ values: "undefined" })
    .withMessage("id is required")
    .isInt()
    .withMessage("id must be an integer"),
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
