var express = require("express");
var router = express.Router();

/* POST user credentials to registers a new user. */
router.post("/register", function (req, res, next) {
  const response = {
    token: "saasfjskejknfssasasakandbask",
  };

  res.json(response);
});

/* POST user credential to authenticate existing user. */
router.post("/signin", function (req, res, next) {
  const response = {
    token: "saasfjskejknfssasasakandbask",
  };

  res.json(response);
});

module.exports = router;
