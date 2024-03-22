const express = require("express");
const router = express.Router();
const db = require('../APIs/database')

/* POSTS photo to detect the faces in it. */
router.post("/", function (req, res, next) {
  const { id } = req.body

  db("users").where("id", "=", id).increment("entries", 1).returning("entries").then(entries => res.send(entries[0].entries)).catch(()=> res.status(400).json("Detecting faces failed"))

  // const response = {
  //   ranking: 1,
  // };

  // res.json(response);
});

module.exports = router;
