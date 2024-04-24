const express = require("express");
const router = express.Router();
const DetectionController = require("../controllers/DetectionControler");
const { validateToken } = require("../middlewares/authorizeAccess")

/* POSTS photo to detect the faces in it. */
router.put("/", validateToken,  DetectionController.detectFaces);

module.exports = router;
