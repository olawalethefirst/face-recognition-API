var express = require("express");
var router = express.Router();

/* POSTS photo to detect the faces in it. */
router.post("/", function (req, res, next) {
  const response = {
    ranking: 1,
  };

  res.json(response);
});

module.exports = router;
