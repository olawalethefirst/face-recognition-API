const { validationResult, body } = require("express-validator");
const { sendErrorResponse } = require("../../utils/response");
const { errorMessages } = require("../../constants");

const validateDetectionRoute = [
  body("imageUrl")
    .notEmpty()
    .withMessage("Image URL is required")
    .trim()
    .isURL()
    .withMessage("imageUrl must be valid"),
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
  validateDetectionRoute
};
