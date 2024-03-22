const express = require("express");
const router = express.Router();
const utils = require("../utils")
const db = require("../APIs/database")

/* GET a user. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;

  console.log("id: ", id)

  if (id && utils.isValidStringCharacters(id)) {
    db.select("*").from("users").where({ id }).then((users) => {
      const user = users[0];

      if (user) {
        res.json(user);
      } else {
        res.status(404).json("User not found.")
      }
    })
  } else {
    res.status(400).json("Invalid parameter specified.")
  }
});

module.exports = router;
