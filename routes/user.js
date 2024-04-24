const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { validateToken } = require("../middlewares/authorizeAccess")

/* GET a user. */
router.get("/", validateToken, UserController.getUser);

module.exports = router;
