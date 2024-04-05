const { validationResult, param } = require('express-validator')
const { sendErrorResponse } = require('../../utils/response')
const { errorMessages } = require("../../constants")

const validateUserRoute = [
    param('id').exists({ values: 'undefined' }).withMessage("id is required").isInt().withMessage('id must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return sendErrorResponse(res, 400, errors.array(), errorMessages.valiadationError);
        }

        next();
    },
]

module.exports = {
    validateUserRoute
}