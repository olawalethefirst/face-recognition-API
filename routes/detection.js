const express = require("express");
const router = express.Router();
const { validatePhotoRoute } = require('../middlewares/validators/detection')
const DetectionController = require("../controllers/DetectionControler");

/* POSTS photo to detect the faces in it. */
router.post("/", validatePhotoRoute, DetectionController.detectFaces);

module.exports = router;
