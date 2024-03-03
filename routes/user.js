var express = require("express");
var router = express.Router();

/* GET a user. */
router.get("/", function (req, res, next) {
  const user = { user: "id", firstName: "Ola", lastName: "Black" };

  res.json(user);
});

module.exports = router;
