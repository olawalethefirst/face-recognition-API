const express = require("express");
const router = express.Router();
const db = require('../APIs/database')
const { sendErrorResponse, sendSuccessResponse } = require('../utils/response')
const { validatePhotoRoute } = require('../middlewares/validators/detection')
const { errorMessages } = require("../constants");
const DetectionController = require("../controllers/DetectionControler");

/* POSTS photo to detect the faces in it. */
router.post("/", validatePhotoRoute, DetectionController.detectFaces);

module.exports = router;
