const express = require("express");
const router = express.Router();
const DetectionController = require("../controllers/DetectionControler");
const { validateToken } = require("../middlewares/authorizeAccess")
const { validateDetectionRoute } = require("../middlewares/validators/detecttion")

/* POSTS photo to detect the faces in it. */
router.put("/", validateToken, validateDetectionRoute,  DetectionController.detectFaces);

module.exports = router;
