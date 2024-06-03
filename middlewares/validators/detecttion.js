const { validationResult, body } = require("express-validator");
const { sendErrorResponse } = require("../../utils/response");

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
  validateDetectionRoute
};
