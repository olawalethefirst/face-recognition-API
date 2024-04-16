const express = require("express");
const router = express.Router();
const { validateUserRoute } = require('../middlewares/validators/user')
const UserController = require("../controllers/UserController");

/* GET a user. */
router.get("/:id", validateUserRoute, UserController.getUser);

module.exports = router;
